import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { NavBarViewComponent } from './nav-bar-view/nav-bar-view.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AboutUsComponent } from './about-us/about-us.component';
// import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { NgInitDirective } from './ng-init.directive';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CoursePageComponent,
    NavBarViewComponent,
    EventsPageComponent,
    ContactPageComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    AllCoursesComponent,
    NgInitDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CarouselModule,
    ToastrModule.forRoot(),
    PaginationModule,
    RatingModule,
    MatRadioModule,
    MatSelectModule

    // NgxNavbarModule
  ],
  providers: [ PaginationConfig, RatingConfig,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
