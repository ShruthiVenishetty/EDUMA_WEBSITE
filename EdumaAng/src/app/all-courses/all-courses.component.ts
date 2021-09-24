import { Component, OnInit } from '@angular/core';
import {EdumaDetailsService} from 'src/app/shared/eduma-details.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';
import { CategoryDetails, Course, FilterData, InstructorDetails } from '../shared/eduma-details.model';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  resultArray:Course[]=[];
  categoriesList:string[]=[];
  freeCount:number;
  freeCourseList:Course[];
  courseFilter:FormGroup;
  listInstructor:string[]=[];
  filterDetails:FilterData=new FilterData();
  listCourse:Course[]=[];
  isPresent:boolean=true;
  paidCount:number;
  FilterForm:FormGroup;
  priceValue:string='';
  startPage:number=0;
  endPage:number=6;
  categoryList:CategoryDetails[]=[];
  instructorList:InstructorDetails[]=[];
  errorResponse:any;

  constructor(public service:EdumaDetailsService,private route:Router) {
  }
  addToarray(list:Course[]) {
    this.listCourse=list;
    this.freeCount=0;
    this.paidCount=0;
    for(var i=0;i<this.listCourse.length; i++){
      if(this.listCourse[i].actualPrice == 0)
      {
        this.freeCount++;
      }
      else
      {
        this.paidCount++;
      }
    }
      this.resultArray = this.listCourse.slice(this.startPage,this.endPage);
    }

  pageChange(event:PageChangedEvent):void{
    const start=(event.page-1)*event.itemsPerPage;
    const end=event.page*event.itemsPerPage;
    this.resultArray=this.listCourse.slice(start,end);
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe((res) => {
      this.addToarray(res as Course[])

     },err=>this.errorResponse=err);
    this.service.getAllCategoryNames().subscribe(res =>{this.categoryList = res as CategoryDetails[]},err=>this.errorResponse=err);
    this.service.getAllInstructorNames().subscribe(res =>{this.instructorList = res as InstructorDetails[]},err=>this.errorResponse=err);

  }

  cardDescription(id:number){
    this.route.navigate(['/course/'+id])
  }
  onSubmitedForm() {
    // this.isPresent=false;
    this.filterDetails.price=this.priceValue;
    this.filterDetails.categories=[];
    this.filterDetails.instructors=[];

  this.categoryList?.forEach(x=>{
    if(x.checked==true)
    {

      this.filterDetails.categories.push(x.categoryName);
    }
  });

  this.instructorList?.forEach(x=>{
    if(x.checked==true)
    {
      this.filterDetails.instructors.push(x.instructorName);
    }
  });

this.service.postFilterData(this.filterDetails).subscribe((res) => {
  this.addToarray(res as Course[])

 },err=>{this.errorResponse=err});

this.route.navigate(['/AllCourses']);

  }

}
