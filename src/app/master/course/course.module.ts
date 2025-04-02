import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/widget/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  { path: 'add-edit', component: AddEditComponent },
  { path:'list', component: ListComponent},
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path:'content-list', component: ContentComponent},
  { path:'content-details/:id', component: ContentComponent}
];


@NgModule({
  declarations: [AddEditComponent, ListComponent, ContentComponent, CourseDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseModule { }
