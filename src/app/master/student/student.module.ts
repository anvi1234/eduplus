import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { StudentListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/widget/shared.module';

const routes: Routes = [
  { path: 'add-edit', component: AddEditComponent },
   { path: 'add-edit/:id', component: AddEditComponent },
  { path:'list', component: StudentListComponent}
];

@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    SharedModule
  ],
})
export class StudentModule { }
