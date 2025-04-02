import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class StudentListComponent implements OnInit {
  @Input() isAction:boolean = true;
  @Output() selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  public columns: { key: string, title: string }[] = [];
  public data: any[] = [];
  public actions: { key: string, title: string, action: (item: any) => void }[] = [];
  constructor(
    private student:StudentService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getColumn();
    this.getStudent()
    if(this.isAction){
      this.getAction();
    }
  
  }

  getAction(){
    this.actions = [
      {
        key: 'edit',
        title: 'Edit',
        action: (item: any) => this.editItem(item)
      },
      {
        key: 'delete',
        title: 'Delete',
        action: (item: any) => this.deleteItem(item)
      }
    ];
  }

  editItem(item:any){
   this.router.navigateByUrl(`/student/add-edit/${item._id}`)
  }

  deleteItem(item:any){
   this.student.deleteStudent(item._id).subscribe((res:any)=>{
    if(res.StatusCode === HttpStatusCode.Ok)
      {
        this.toaster.success(res.message);
        this.getStudent();
      }
   })
  }

  getColumn(){
   this.columns =  this.student.getColumns();
  }

  getStudent(){
    this.student.getStudents().subscribe((res:any)=>{
        if(res.StatusCode === HttpStatusCode.Ok){
          this.data = res.Data;
        }
    })
  }

  addStudent(){
    this.router.navigateByUrl("/student/add-edit")
  }

  getCheckedData(e:any){
      this.selectedItemsChange.emit(e)
  }
}
