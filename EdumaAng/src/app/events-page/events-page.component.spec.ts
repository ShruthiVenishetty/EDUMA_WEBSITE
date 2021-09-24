import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EventDetails } from '../shared/eduma-details.model';
import { EdumaDetailsService } from '../shared/eduma-details.service';

import { EventsPageComponent } from './events-page.component';

describe('EventsPageComponent', () => {
  let component: EventsPageComponent;
  let fixture: ComponentFixture<EventsPageComponent>;
  let service:EdumaDetailsService;
  let element;
  let http:HttpTestingController;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsPageComponent ],
      providers:[EdumaDetailsService,HttpTestingController],
      imports:[RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(inject([EdumaDetailsService], (s: EdumaDetailsService) => {
    service = s;
    fixture = TestBed.createComponent(EventsPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));
  let eventsList:EventDetails[]=[{
    "eventId": 1,
    "eventName": "Build Education Website Using WordPress",
    "startDate": new Date('2021-06-06'),
    "endDate":  new Date('2023-08-06'),
    "location": "CHICAGO, US",
    "about": "Tech you how to build a complete Learning Management System with WordPress and LearnPress.",
    "imageUrl": "https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/event-4-450x233.jpg"
   }];

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call getEvents and return list of Events",() => {

    spyOn(service, 'getEvents').and.returnValue(of(eventsList))

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.eventList).toEqual(eventsList);
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
  it('getEvents should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No response'};
    spyOn(service,'getEvents').and.returnValue(throwError(mockErrorResponse))
    component.ngOnInit();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });

});
