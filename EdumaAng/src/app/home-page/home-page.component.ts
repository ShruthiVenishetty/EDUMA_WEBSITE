import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EdumaDetailsService } from '../shared/eduma-details.service';
import {Course, EventDetails} from '../shared/eduma-details.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
listCourse:Course[]=[];
eventList:EventDetails[]=[];
errorResponse:any;
  constructor(private router : Router,public service:EdumaDetailsService) { }

  ngOnInit(): void {
    this.service.getCourses().subscribe((res) => {
      this.addToarray(res as Course[])

     },err=>this.errorResponse=err);
    this.service.getEvents().subscribe(res =>{this.eventList = res as EventDetails[]},err=>this.errorResponse=err);

  }
  onCourses(id:number){
    this.router.navigate(['/course/'+id])
  }
  addToarray(list:Course[]) {
    this.listCourse=list;
    }

}
