import { HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EdumaDetailsService } from '../shared/eduma-details.service';
import { Location } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {defer, Observable, of, throwError } from 'rxjs';
import { Course ,EventDetails} from '../shared/eduma-details.model';
import { HttpTestingController } from  '@angular/common/http/testing';


export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let service:EdumaDetailsService;
  let element;
  let http:HttpTestingController;
  let response:any;
   let errorResponse:any;
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
   let eventsList:EventDetails[]=[{
    "eventId": 1,
    "eventName": "Build Education Website Using WordPress",
    "startDate": new Date('2021-06-06'),
    "endDate":  new Date('2023-08-06'),
    "location": "CHICAGO, US",
    "about": "Tech you how to build a complete Learning Management System with WordPress and LearnPress.",
    "imageUrl": "https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/event-4-450x233.jpg"
   }];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers:[EdumaDetailsService,HttpTestingController],
      imports:[RouterTestingModule,HttpClientModule]

    })
    .compileComponents();
  });
  beforeEach(inject([EdumaDetailsService], (s: EdumaDetailsService) => {
    service = s;
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('Should redirect from /home to /course page',()=>{
    const router = TestBed.inject(Router);
    let spy=spyOn(router,'navigate');
    component.onCourses(1);
    expect(spy).toHaveBeenCalledWith(['/course/1']);

  });
  it("should call getCourses and return list of Courses", () => {

    spyOn(service, 'getCourses').and.returnValue(of(courses))

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.listCourse).toEqual(courses);
  });
  it("should call getEvents and return list of Events", () => {

    spyOn(service, 'getEvents').and.returnValue(of(eventsList))

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.eventList).toEqual(eventsList);
  });

  it('arrayList should assign list courses ',()=>{
    component.addToarray(courses);
    expect(component.listCourse).toEqual(courses);
  });
 it('getEvents should throw error when method is not found',()=>{
   http=TestBed.inject(HttpTestingController);
   const mockErrorResponse = { status:404,statusText:'Not Found'};
   spyOn(service,'getEvents').and.returnValue(throwError(mockErrorResponse))
   component.ngOnInit();
   expect(component.errorResponse.status).toBe(mockErrorResponse.status);
   expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
 });
 it('getEvents should throw error when there is no content',()=>{
   http=TestBed.inject(HttpTestingController);
   const mockErrorResponse = { status:204,statusText:'No Content'};
   spyOn(service,'getEvents').and.returnValue(throwError(mockErrorResponse))
   component.ngOnInit();
   expect(component.errorResponse.status).toBe(mockErrorResponse.status);
   expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
 });
 it('getEvents should throw error when there is internal server issue',()=>{
   http=TestBed.inject(HttpTestingController);
   const mockErrorResponse = { status:500,statusText:'Internal server issue'};
   spyOn(service,'getEvents').and.returnValue(throwError(mockErrorResponse))
   component.ngOnInit();
   expect(component.errorResponse.status).toBe(mockErrorResponse.status);
   expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
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
});
