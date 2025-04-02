import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { Batch } from 'src/app/model/batch.model';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public batchDetails:Batch[] = []
  constructor(
    private service: BatchService,
    private router: Router,
    private toastSer: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getBatch();
  }

  getBatch(){
    this.service.getBatches().subscribe((res:any)=>{
      if(res.StatusCode == HttpStatusCode.Ok){
        this.batchDetails = res.Data
      }
    })
  }

  addBatch(){
    this.router.navigateByUrl("/batch/add-edit")
  }

  edit(data:any){
    this.router.navigateByUrl(`/batch/add-edit/${data._id}`)
  }

  delete(data:any){
    this.service.deleteBatch(data._id).subscribe((res:any)=>{
      if(res.StatusCode == HttpStatusCode.Ok){
        this.toastSer.success(res.message)
        this.getBatch();
      }
    })
  }

}
