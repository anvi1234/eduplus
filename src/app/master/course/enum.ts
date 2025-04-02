export interface Course {
    _id: string;
    courseName: string;
    courseDescription: string;
    courseDuration: number;
    courseFees: number;
    courseImage: string;
    courseRating: number;
    courseCategory: string;
    courseSubCategory: string;
    validity: string;
    courseId: number;
    uploadVideo?: string; // This field is optional since it's not present in every object
    __v: number;
  }