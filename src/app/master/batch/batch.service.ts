import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from 'src/app/model/batch.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = environment.apiBaseUrl; // Replace with your API URL

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all batches
  getBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.apiUrl}/batch/get-batch`);
  }

  // Get a single batch by ID
  getBatch(id: String): Observable<Batch> {
    const url = `${this.apiUrl}/batch/get-batch-by-id/${id}`;
    return this.http.get<Batch>(url);
  }

  // Add a new batch
  addBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.apiUrl}/batch/add-batch`, batch, this.httpOptions);
  }

  // Update an existing batch
  updateBatch(ukey:string,batch: Batch): Observable<Batch> {
    const url = `${this.apiUrl}/batch/update-batch/${ukey}`;
    return this.http.put<Batch>(url, batch, this.httpOptions);
  }

  // Delete a batch by ID
  deleteBatch(id: number): Observable<void> {
    const url = `${this.apiUrl}/batch/delete-batch/${id}`;
    return this.http.delete<void>(url);
  }
}
