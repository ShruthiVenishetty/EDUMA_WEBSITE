import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  href:string='';
  text:string='';
  name:string='';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.setText(this.router.url);

  }
  setText(link:string){
    if(link.split('/')[1] == 'course')
    {
      this.text='COURSES';
      this.name='Course';
    }
    else if(link == '/contact')
    {

      this.text='CONTACTS';
      this.name='Contact';
    }
    else if(link == '/event')
    {

      this.text='EVENTS';
      this.name='Event';
    }
    else if(link == '/about')
    {
      this.text='ABOUT US';
      this.name='About Us';
    }
    else if(link=='/AllCourses')
    {
      this.text='ALL COURSES';
      this.name='All courses';
    }

  }


}
