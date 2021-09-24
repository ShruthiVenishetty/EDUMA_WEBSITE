import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/eduma-details.model';
import { EdumaDetailsService } from '../shared/eduma-details.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
 href:string;
 actualUrl:string;
listOfCourses:Course[]=[];
course?:Course;
id:number;
value:number=5;
errorResponse:any;
  constructor(private router:Router,public service:EdumaDetailsService) { }

  ngOnInit(): void {
    this.href=this.router.url;
    this.id=Number(this.href.split('/')[2]);
    this.service.getCourses().subscribe((res) => {
      this.addToarray(res as Course[])

     },err=>this.errorResponse=err);
  }
  addToarray(list:Course[]) {
    this.listOfCourses=list;
    this.course=this.listOfCourses.find(x=>x.courseId==this.id);
    }
}
