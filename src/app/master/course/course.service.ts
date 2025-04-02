import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiBaseUrl; // Replace with your API endpoint
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Create a new course
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/course/create-course`, course);
  }

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course/getcourse`);
  }

  // Get a single course by ID
  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/course/get-course-byid/${id}`);
  }

  // Update a course by ID
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  // Delete a course by ID
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getContents(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/get-content`);
  }

  getContent(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/content/get-content/${id}`);
  }

  createContent(course: any): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/content/create-content`, course);
  }

  updateContent(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/update-content/${id}`, course);
  }

  deleteContent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
