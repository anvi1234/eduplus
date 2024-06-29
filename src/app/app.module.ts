import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './master/layout/layout.component';
import { BatchComponent } from './master/batch/batch.component';
import { StudentComponent } from './master/student/student.component';
import { ListComponent } from './master/batch/list/list.component';
import { AddEditComponent } from './master/batch/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BatchComponent,
    StudentComponent,
    ListComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
