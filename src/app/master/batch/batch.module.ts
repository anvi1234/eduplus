import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/widget/shared.module';
import { BatchService } from './batch.service';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: 'add-edit', component: AddEditComponent },
  { path: 'add-edit/:id', component: AddEditComponent },
  { path:'list', component: ListComponent}
];

@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers:[BatchService]
})
export class BatchModule { }
