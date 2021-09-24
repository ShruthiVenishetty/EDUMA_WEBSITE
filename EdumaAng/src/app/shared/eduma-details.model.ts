export class EventDetails {
    eventId:number;
    eventName:string;
    startDate:Date;
    endDate:Date;
    location:string;
    about:string;
    imageUrl:string;

}
export class Register{
  email: string;
  userName:string;
  password: string;
}
export class Course
{
  courseId: number;
  imageUrl: string;
  courseName: string;
  studentCount: number;
  commentsCount: number;
  discountedPrice: number;
  actualPrice: number;
  categories: string;
  reviewCount: number;
  lecturesCount: number;
  quizzes: number;
  durationInHours: number;
  skillLevel: string;
  language: string;
  certificate: boolean;
  assessments: boolean;
  profilePicUrl:string;
instructorName:string;

}
export class CategoryDetails{
  categoryName:string;
  categoryCount:number;
  checked:boolean;
}
export class InstructorDetails{
  instructorName:string;
  instructorCount:number;
  checked:boolean;
}
export class FilterData{
  categories:string[]=[];
  instructors:string[]=[];
  price:string="All";
}
