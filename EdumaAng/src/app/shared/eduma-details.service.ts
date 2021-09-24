import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CategoryDetails, Course, EventDetails, FilterData, InstructorDetails, Register } from './eduma-details.model';
// import * as Urls from 'src/app/Address.json';

@Injectable({
  providedIn: 'root'
})
export class EdumaDetailsService {
  eventList:EventDetails[];
  isUserLoggedIn: boolean = false;
  courseList:Course[]=[];
  categoryList:CategoryDetails[];
  instructorList:InstructorDetails[];
  postCourseList:Course[];


  // addr:{baseUrl:string}[]=Urls;
  readonly baseURL="https://localhost:44353/api";


  constructor(private http:HttpClient) { }

  getEvents()
  {
    const headers = {
       'content-type': 'application/json',
     }

    return this.http.get(this.baseURL + '/Events',{'headers':headers});
  }
  login(userName: string, password: string): Observable <any>{
    return this.http.post(this.baseURL+'/Login/Login',{
       "email": userName,
       "password": password
     }, {observe: 'response'})}

 registerPage(register:Register): Observable <any>{

  return this.http.post(this.baseURL+'/Login/Register',{ "email": register.email,
    "userName":register.userName,
    "password": register.password}, {observe: 'response'});
 }
 getCourses()
 {
  const headers = {
    'content-type': 'application/json',
  }
  return this.http.get(this.baseURL + '/Courses',{'headers':headers});

 }
 getAllCategoryNames()
 {
  const headers = {
    'content-type': 'application/json',
  }
  return this.http.get(this.baseURL + '/Courses/AllCategoryName',{'headers':headers});

 }
 getAllInstructorNames()
 {
  const headers = {
    'content-type': 'application/json',
  }
  return this.http.get(this.baseURL + '/Courses/AllInstructorNames',{'headers':headers});

 }
 postFilterData(filterData:FilterData)
 {
  this.courseList.length=0;
  console.log("HI");
  console.log(this.courseList);
  const headers = {
    'content-type': 'application/json',
  }
  const body=filterData;
  return this.http.post(this.baseURL + '/Courses/Filters',body,{'headers':headers});

 }

}
