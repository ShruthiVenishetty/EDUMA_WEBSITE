import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EdumaDetailsService } from '../shared/eduma-details.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers:[EdumaDetailsService],
      imports:[RouterTestingModule,HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('on redirecting to /course/1 it should set text',()=>{
    component.setText('/course/1');
    expect(component.text).toBe('COURSES');

  });
  it('on redirecting to /course/1 it should set name ',()=>{
    component.setText('/course/1');
    expect(component.name).toBe('Course');
  });
  it('on redirecting to /about it should set text',()=>{
    component.setText('/about');
    expect(component.text).toBe('ABOUT US');

  });
  it('on redirecting to /about it should set name ',()=>{
    component.setText('/about');
    expect(component.name).toBe('About Us');
  });
  it('on redirecting to /contact it should set text',()=>{
    component.setText('/contact');
    expect(component.text).toBe('CONTACTS');

  });
  it('on redirecting to /contact it should set name ',()=>{
    component.setText('/contact');
    expect(component.name).toBe('Contact');
  });
  it('on redirecting to /event it should set text',()=>{
    component.setText('/event');
    expect(component.text).toBe('EVENTS');

  });
  it('on redirecting to /event it should set name ',()=>{
    component.setText('/event');
    expect(component.name).toBe('Event');
  });
  it('on redirecting to /AllCourses it should set text',()=>{
    component.setText('/AllCourses');
    expect(component.text).toBe('ALL COURSES');

  });
  it('on redirecting to /AllCourses it should set name ',()=>{
    component.setText('/AllCourses');
    expect(component.name).toBe('All courses');
  });
});
