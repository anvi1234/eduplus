import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public courseData:Course[]=[];
  constructor(
    private router:Router,
    private courseSer: CourseService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCourse()
  }


  getCourse(){
    this.courseSer.getCourses().subscribe((data:any)=>{
      this.courseData = data;
          console.log("this", this.courseData)
    })
  }
  addCourse(){
    this.router.navigateByUrl("/course/add-edit")
  }

  naviagate(id:string){
    console.log("sadhaskd", id)
    this.router.navigateByUrl(`/course/course-details/${id}`)
  }

}
