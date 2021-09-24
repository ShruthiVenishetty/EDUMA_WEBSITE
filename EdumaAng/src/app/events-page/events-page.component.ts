import { Component, OnInit } from '@angular/core';
import {EventDetails} from 'src/app/shared/eduma-details.model';
import {EdumaDetailsService} from 'src/app/shared/eduma-details.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
 eventList:EventDetails[]=[];
 errorResponse:any;
  constructor(public service:EdumaDetailsService) { }

  ngOnInit(): void {
   this.service.getEvents().subscribe(res =>{this.eventList = res as EventDetails[]},err=>this.errorResponse=err);

  }
}
