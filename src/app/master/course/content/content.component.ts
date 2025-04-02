import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { finalize, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contentForm: FormGroup;
  downloadURL: Observable<string> = new Observable<string>();
  isLoader:boolean = false;
  isEditMode:boolean = false;
  ukey: any;
  contentData: any;

  constructor(private fb: FormBuilder, private courseService: CourseService,
    private storage: AngularFireStorage,
    private activedRoute: ActivatedRoute,
    private toasterSer: ToastrService
  ) {
    this.contentForm = this.fb.group({
      folders: this.fb.array([])
    });
    this.addFolder(); // Initialize with one folder
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((param=>{
      this.ukey = param['id'];
    }))

    this.getContentByCourseId();

    // Patch existing data into the form
  }

  newFolder(): FormGroup {
    return this.fb.group({
      folderName: ['', Validators.required],
      videos: this.fb.array([]),
      documents: this.fb.array([])
    });
  }

  newVideo(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      uploadVideo:['', Validators.required]
    });
  }

  newDoc(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      uploadDocx:['', Validators.required]
    });
  }
  addFolder() {
    const folderForm = this.fb.group({
      folderName: ['', Validators.required],
      videos: this.fb.array([this.createVideo()]),
      documents: this.fb.array([this.createDocument()])
    });
    this.folders.push(folderForm);
  }


  getVideos(folderIndex: number): FormArray {
    return this.folders.at(folderIndex).get('videos') as FormArray;
  }

  get folders(): FormArray {
    return this.contentForm.get('folders') as FormArray;
  }

  folderGroup(index:number) {
   return (this.folders.at(index) as FormGroup).get('folderName')?.value
  }

  getDocuments(index: number): FormArray {
    return this.folders.at(index).get('documents') as FormArray;
  }

  patchFormWithData(data: any): void {
    console.log("data", data)
    const foldersArray = this.contentForm.get('folders') as FormArray;
  
    // Loop through each folder in the data
    data.folder.forEach((folder: any) => {
      // Create a new FormGroup for each folder
      const folderGroup = this.fb.group({
        folderName: [folder.folderName, Validators.required],
        videos: this.fb.array([]),  // Empty array initially
        documents: this.fb.array([])  // Empty array initially
      });
  
      // Patch videos into the form (if any)
      folder.video.forEach((video: any) => {
        const videoGroup = this.fb.group({
          name: [video.name, Validators.required]  // Create a form group for each video
        });
        (folderGroup.get('videos') as FormArray).push(videoGroup);  // Add video form group to videos array
      });
  
      // Patch documents into the form
      folder.documents.forEach((document: any) => {
        const documentGroup = this.fb.group({
          name: [document.name, Validators.required],  // Create a form group for each document
          file: [document.file || null]  // Add file if it exists
        });
        (folderGroup.get('documents') as FormArray).push(documentGroup);  // Add document form group to documents array
      });
  
      // Push the folder group into the folders FormArray
      foldersArray.push(folderGroup);
    });
  }
  
  removeFolder(index: number) {
    this.folders.removeAt(index);
  }

  addVideo(folderIndex: number) {
    this.getVideos(folderIndex).push(this.createVideo());
  }

  removeVideo(folderIndex: number, videoIndex: number) {
    this.getVideos(folderIndex).removeAt(videoIndex);
  }

  addDocument(folderIndex: number) {
    this.getDocuments(folderIndex).push(this.createDocument());
  }

  removeDocument(folderIndex: number, documentIndex: number) {
    this.getDocuments(folderIndex).removeAt(documentIndex);
  }

  createVideo(): FormGroup {
    return this.fb.group({
      name: [''],
      file: [null]
    });
  }

  createDocument(): FormGroup {
    return this.fb.group({
      name: [''],
      file: [null]
    });
  }

  onFileChange(event: any, folderIndex: number, itemIndex: number, type: string, folderName:string){
    this.isLoader = true;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `${folderName}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`${folderName}/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            console.log("url", url)
            if (type === 'video') {
              this.getVideos(folderIndex).at(itemIndex).get('file')?.setValue(url);
             } else {
               this.getDocuments(folderIndex).at(itemIndex).get('file')?.setValue(url);
             }
            this.isLoader = false;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  getContentByCourseId(){
    this.courseService.getContent(this.ukey).subscribe((res:any)=>{
      if(res.StatusCode === HttpStatusCode.Ok){
        this.isEditMode = false;
        this.contentData = res.data;
        this.patchFormWithData(res.data);
      }
      else{
        this.isEditMode = true;
      }
        
    })
  }


  onSubmit(): void {
    let object = {
      courseId: this.ukey,
      folder: this.contentForm.value.folders
    }
    if(this.isEditMode){
      this.updateData(object)
    }
    else{
      this.saveData(object)
    }
  }

  saveData(object:any){
    this.courseService.createContent(object).subscribe((res:any)=>{
      if(res.StatusCode == HttpStatusCode.Ok){
        this.toasterSer.success(res.message)
      }
      else{
        this.toasterSer.error(res.message);
      }
    })
  }

  updateData(object:any){
      this.courseService.createContent(object).subscribe((res:any)=>{
        if(res.StatusCode == HttpStatusCode.Ok){
          this.toasterSer.success(res.message)
        }
        else{
          this.toasterSer.error(res.message);
        }
      })
    }
  
}

