// src/app/student.model.ts
export interface Student {
  id?: number;
  studentName: string;
  batchId: number;
  mobileNumber: string;
  dateOfJoining: Date;
  parentName: string;
  parentMobileNumber: string;
  parentEmail: string;
  courseName: string;
  fees: number;
  dueFees: number;
}

export interface column {
  
}