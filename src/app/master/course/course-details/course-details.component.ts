import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  public ukey : string = '';
  public isEditMode:boolean = false;
  public data: any;
  constructor(
    private activedRoute: ActivatedRoute,
    private CourseSer: CourseService,
    private router:Router
  ) { 

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

  getDataById(ukey:string){
    this.CourseSer.getCourse(ukey).subscribe((res:any)=>{
      this.data = res;
  
    })
  }

  content(){
this.router.navigateByUrl(`/course/content-details/${this.ukey}`)
  }
}
