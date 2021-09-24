import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EdumaDetailsService } from '../shared/eduma-details.service';

import { AllCoursesComponent } from './all-courses.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Course } from '../shared/eduma-details.model';
import * as courseData from '../courseListTest.json';
import { of, throwError } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';


describe('AllCoursesComponent', () => {
  let component: AllCoursesComponent;
  let fixture: ComponentFixture<AllCoursesComponent>;
  let service:EdumaDetailsService;
  let event :PageChangedEvent;
  let sizePerPage:number;
  let pageNumber:number;
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
  let listCategory=[{
    "categoryName": "BACKEND",
    "categoryCount": 1,
    "checked":true
  }];
  let listInstructor=[{
    "instructorName":"Anthony",
    "instructorCount":2,
    "checked":true
  }]


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCoursesComponent ],
      providers:[EdumaDetailsService,HttpTestingController],
      imports:[RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  });
  beforeEach(inject([EdumaDetailsService], (s: EdumaDetailsService) => {
    service = s;
    fixture = TestBed.createComponent(AllCoursesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('arrayList should calculate free courses count',()=>{
    component.addToarray(courses);
    expect(component.freeCount).toBe(1);
  });
  it('arrayList should calculate paid courses count',()=>{
    component.addToarray(courses);
    expect(component.paidCount).toBe(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should redirect from /allCourses to /course page',()=>{
    let router = TestBed.inject(Router);
    let spy=spyOn(router,'navigate');
    component.cardDescription(1);
    expect(spy).toHaveBeenCalledWith(['/course/1']);

  });
  it('Should redirect from allCourses to  itself on clicking onSubmitedForm',()=>{
    let router = TestBed.inject(Router);
    let spy=spyOn(router,'navigate');
    component.categoriesList=[];
    component.listInstructor=[];
    component.priceValue='';
    component.onSubmitedForm();
    expect(spy).toHaveBeenCalledWith(['/AllCourses']);

  });
  it("should call getCourses and return list of Courses", async() => {

    spyOn(service, 'getCourses').and.returnValue(of(courses))

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.resultArray).toEqual(courses);
  });
  it("If categories is checked then it is pushed into filter details",() => {

   spyOn(service,'getAllCategoryNames').and.returnValue(of(listCategory));
   spyOn(service,'getAllInstructorNames').and.returnValue(of(listInstructor));
   component.filterDetails.price = "All";
   component.ngOnInit();
   component.onSubmitedForm();

    fixture.detectChanges();

    expect(component.filterDetails.categories.length).toBe(1);
  });
  it("If instructors is checked then it is pushed into filter details",() => {

   spyOn(service,'getAllCategoryNames').and.returnValue(of(listCategory));
   spyOn(service,'getAllInstructorNames').and.returnValue(of(listInstructor));
   component.filterDetails.price = "All";
   component.ngOnInit();
   component.onSubmitedForm();

    fixture.detectChanges();

    expect(component.filterDetails.instructors.length).toBe(1);
  });

  it('postFilterData should throw error when method is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'postFilterData').and.returnValue(throwError(mockErrorResponse))
    component.onSubmitedForm();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('postFilterData should throw error when there is no content',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:204,statusText:'No Content'};
    spyOn(service,'postFilterData').and.returnValue(throwError(mockErrorResponse))
    component.onSubmitedForm();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('postFilterData should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'postFilterData').and.returnValue(throwError(mockErrorResponse))
    component.onSubmitedForm();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('postFilterData should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'postFilterData').and.returnValue(throwError(mockErrorResponse))
    component.onSubmitedForm();
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
  it('getCourses should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'getCourses').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });

  it('getAllCategoryNames should throw error when method is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'getAllCategoryNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllCategoryNames should throw error when there is no content',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:204,statusText:'No Content'};
    spyOn(service,'getAllCategoryNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllCategoryNames should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'getAllCategoryNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllCategoryNames should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'getAllCategoryNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllInstructorNames should throw error when method is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'getAllInstructorNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllInstructorNames should throw error when there is no content',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:204,statusText:'No Content'};
    spyOn(service,'getAllInstructorNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllInstructorNames should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'getAllInstructorNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('getAllInstructorNames should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'getAllInstructorNames').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });


});
