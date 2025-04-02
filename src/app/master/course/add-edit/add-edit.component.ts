import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/model/course.model';
import { CourseService } from '../course.service';
import { finalize, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  courseForm: FormGroup;
  thmNailUrl:string=''
  videoUrl:string=''
  isLoader:boolean= false;
  isCourse:boolean = false;
  isVideo:boolean = false;
  downloadURL: Observable<string> = new Observable<string>();
  ngOnInit(): void {
    
  }
  constructor(private fb: FormBuilder,
    private service: CourseService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
    private toasterSer: ToastrService
  ) {
    this.courseForm = this.fb.group({
      id: [0], // Default value for ID
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseDuration: [0, [Validators.required, Validators.min(1)]],
      courseFees: [0, [Validators.required, Validators.min(0)]],
      courseImage: ['',Validators.required],
      courseRating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      courseCategory: ['', Validators.required],
      courseSubCategory: ['', Validators.required],
      validity:['', Validators.required]
    });
  }

  onSubmit() {
    this.courseForm.markAllAsTouched();
    this.isCourse = false;
    this.courseForm.get('courseImage')?.setValue(this.thmNailUrl);
    if(!this.courseForm.get('courseImage')?.value){
      this.isCourse = true;
  }
    if (this.courseForm.valid) {
      const courseData: Course = this.courseForm.value;
      this.service.createCourse(courseData).subscribe((res:any)=>{
        if(res.StatusCode === HttpStatusCode.Ok){
          this.toasterSer.success(res.message);
          this.router.navigateByUrl("/course/list")
        }
        
      })
    } else {
      console.log('Form is invalid');
    }
  }

  onChange(event:any) {
    this.isLoader = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `thumbnail/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`thumbnail/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.thmNailUrl = url;
              this.isLoader = false 
              this.isCourse = false;
             
            }
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  onContentChange(event:any){
    this.isLoader = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `video/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`video/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.videoUrl = url;
              this.isLoader = false 
              this.isVideo = false;
            }
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
          
        }
      });
  }

}
