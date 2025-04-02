import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './master/student/student.component';


const routes: Routes = [
  {path:"", component: StudentComponent},
  {path:"batch", loadChildren:()=> import('../app/master/batch/batch.module').then(m=>m.BatchModule)},
  {path:'student', loadChildren:()=> import('../app/master/student/student.module').then(m=>m.StudentModule)},
  {path:'course', loadChildren:()=> import('../app/master/course/course.module').then(e=>e.CourseModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
