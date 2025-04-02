import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchService } from '../batch.service';
import { Batch } from 'src/app/model/batch.model';
import { ToastrService } from 'ngx-toastr';
import { HttpStatusCode } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student/student.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public myForm: FormGroup;
  public ukey: string = '';
  public isEditMode : boolean = false;
  public showBehind: boolean = false;
  public selectedStudent:[] = []
  public getUkeyByData:any;
  constructor(private fb: FormBuilder,
    private service: BatchService,
    private toastSer: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private studentSer: StudentService
  ) {
    this.myForm = this.fb.group({
      batchName: ['', Validators.required],
      batchCode: ['', Validators.required],
      subject: ['', Validators.required],
      batchDate: ['', Validators.required],
      studentEnrolled: ['']
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      const batchData: Batch = this.myForm.value;
      if (this.isEditMode) {
        this.service.updateBatch(this.ukey, batchData).subscribe((res: any) => {
          if(res.StatusCode === HttpStatusCode.Ok){
            this.toastSer.success(res.message);
            this.getDataById(this.ukey)
          }
          else{
            this.toastSer.error(res.message);
          }
          
        });
      } else {
        this.service.addBatch(batchData).subscribe((res: any) => {
          if(res.StatusCode === HttpStatusCode.Ok){
            this.toastSer.success(res.message);
            this.router.navigateByUrl("/batch/list")
          }
          else{
            this.toastSer.error(res.message);
          }
          
        });
      }
    }
    else{
      this.myForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((param=>{
      this.ukey = param['id'];
      if(this.ukey){
        this.isEditMode = true;
        this.getDataById(this.ukey);
      }
    }))
  }

  getDataById(ukey:String){
    this.service.getBatch(ukey).subscribe((res:any)=>{
      if(res.StatusCode == HttpStatusCode.Ok){
        let data = res.Data;
        this.getUkeyByData = res.Data;
        this.myForm.patchValue({
          batchName: data.batchName,
          batchCode: data.batchCode,
          subject: data.subject,
          batchDate: data.batchDate,
          studentEnrolled: data.studentEnrolled
        
        })
      }
    })
  }

  cancel(){
    this.router.navigateByUrl("/batch/list")
  }
  addStudent(){
  this.showBehind = !this.showBehind;
  }

  getEventData(e:any){
    this.selectedStudent = e;
    this.selectedStudent.map((e:any)=>{
      e.batchName = this.getUkeyByData.batchCode;
      e.batchId = this.getUkeyByData.batchId;
      return e;
    })
  }


  update(){
    this.studentSer.updateStudents(this.selectedStudent).subscribe((res:any)=>{
      if(res.StatusCode == HttpStatusCode.Ok){
        this.toastSer.success(res.message);
      }
      else{
        this.toastSer.error(res.message); 
      }
    })
  }
}
