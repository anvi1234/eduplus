import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiBaseUrl}/student`; // Replace with your API URL

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/getstudents`);
  }

  // Get a single student by ID
  getStudent(id: string): Observable<Student> {
    const url = `${this.apiUrl}/get-student-byid/${id}`;
    return this.http.get<Student>(url);
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/create-student`, student, this.httpOptions);
  }

  // Update an existing student
  updateStudent(ukey:string,student: Student): Observable<Student> {
    const url = `${this.apiUrl}/update-student/${ukey}`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  // Delete a student by ID
  deleteStudent(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete-students/${id}`;
    return this.http.delete<void>(url);
  }

  updateStudents(student: Student[]): Observable<Student> {
    const url = `${this.apiUrl}/update-students`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  getColumns(): { key: string, title: string }[] {
    return [
      { key: 'studentName', title: 'Name' },
      { key: 'batchCodeName', title: 'Batch Code' },
      { key: 'courseName', title: 'Cousrse Name' },
      { key: 'mobileNumber', title: 'Contact Number' },
      { key: 'email', title: 'Email' }
    ];
  }
}
