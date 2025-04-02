import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from 'src/app/model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../../batch/batch.service';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public studentForm: FormGroup;
  public studentId: string ='';
  public batchCode: { Text: string, Value: number }[] = [];
  public isEditMode:boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private batchSerive: BatchService,
    private route: ActivatedRoute,
    private router: Router,
    private toasterSer: ToastrService
  ) {
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      batchId: [0, Validators.required],
      email:['',[Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dateOfJoining: ['', Validators.required],
      parentName: ['', Validators.required],
      parentMobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      parentEmail: ['',[Validators.required, Validators.email]],
      courseName: ['', Validators.required],
      fees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dueFees: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
    this.getBatchCode();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.studentId = id;
        this.isEditMode = true;
       this.getStudentById();
      }
    });
  }

  getStudentById(){
    this.studentService.getStudent(this.studentId).subscribe(student => {
      this.studentForm.patchValue(student);
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      student.batchId = Number(student.batchId)
      if (this.isEditMode) {
        this.studentService.updateStudent(this.studentId, student).subscribe((res:any) => {
          if(res.StatusCode === HttpStatusCode.Ok){
            this.toasterSer.success(res.message);
            this.getStudentById();
          }
          else{
            this.toasterSer.error(res.message)
          }
        });
      } else {
        this.studentService.addStudent(student).subscribe((res:any) => {
          if(res.StatusCode === HttpStatusCode.Ok){
            this.toasterSer.success(res.message);
            this.router.navigate(['/student/list']);
          }
          else{
            this.toasterSer.error(res.message)
          }
        });
      }
    }
    else{
      this.studentForm.markAllAsTouched();
    }
  }


  getBatchCode(){
    this.batchSerive.getBatches().subscribe((res:any)=>{
      if(res.Data.length > 0){
        this.batchCode = res.Data.map((batch: any) => {
          return { Text: batch.batchCode, Value: batch.batchId };
        });
      }  
    })
  }

  cancel(){
    this.router.navigateByUrl("/student/list")
  }

  emailChange(e: any,controlName:string) {
    let email = e.target.value;
    if (!email.includes('@')) { 
      this.studentForm.get(controlName)?.setValidators([]);
    } else {
      // Set the validator to email validation if '@' is present
      this.studentForm.get(controlName)?.setValidators([Validators.required, Validators.email]);
    }
    // Update the form control's validity
    this.studentForm.get(controlName)?.updateValueAndValidity();
  }
}