import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/widget/error/error.component';
import { TableComponent } from './table/table.component';
import { StudentListComponent } from '../master/student/list/list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ErrorComponent, TableComponent, StudentListComponent],
  imports: [FormsModule ,
    CommonModule
  ],
  exports:[ErrorComponent,TableComponent,StudentListComponent]
})
export class SharedModule { }
