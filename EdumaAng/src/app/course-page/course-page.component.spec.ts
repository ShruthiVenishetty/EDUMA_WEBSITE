import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { Course } from '../shared/eduma-details.model';
import { EdumaDetailsService } from '../shared/eduma-details.service';

import { CoursePageComponent } from './course-page.component';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;
  let service:EdumaDetailsService;
  let element;
  let http:HttpTestingController;
  let courses:Course[]=[{
    "courseId": 1,
    "imageUrl": "https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/course-4.jpg",
    "profilePicUrl": "https://eduma.thimpress.com/demo-2/wp-content/uploads/learn-press-profile/12/athony1-thumb.jpg",
    "instructorName": "Anthony",
    "courseName": "Introduction LearnPress – LMS plugin",
    "studentCount": 337,
    "commentsCount": 3,
    "discountedPrice": 0,
    "actualPrice": 0,
    "categories": "GENERAL",
    "reviewCount": 3,
    "lecturesCount": 1,
    "quizzes": 0,
    "durationInHours": 3,
    "skillLevel": "All Levels",
    "language": "English",
    "certificate": false,
    "assessments": true
   }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePageComponent ],
      providers:[EdumaDetailsService,HttpTestingController],
      imports:[RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  });
  beforeEach(inject([EdumaDetailsService], (s: EdumaDetailsService) => {
    service = s;
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('arrayList should assign list of courses ',()=>{
    component.addToarray(courses);
    expect(component.listOfCourses).toEqual(courses);
  });

  it('getCourses should throw error when method is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'getCourses').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getCourses should throw error when there is no content',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:204,statusText:'No Content'};
    spyOn(service,'getCourses').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getCourses should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'getCourses').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getCourses should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'getCourses').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
});


