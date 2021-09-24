import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
 ],
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  slides = [
    {image: 'https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/slider-3.jpg'},
    {image: 'https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/slider-2.jpg'},
    {image: 'https://eduma.thimpress.com/demo-2/wp-content/uploads/sites/18/2015/11/slider-1.jpg'}
 ];
 noWrapSlides = false;
 showIndicator = true;

  constructor() { }

  ngOnInit(): void {
  }

}
