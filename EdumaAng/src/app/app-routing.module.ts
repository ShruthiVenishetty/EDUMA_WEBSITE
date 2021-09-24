import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {path:"home", component:HomePageComponent},
  {path:"event", component:EventsPageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'course/:id',component:CoursePageComponent},
  {path:'contact',component:ContactPageComponent},
  {path:'about',component:AboutUsComponent},
  {path:'AllCourses',component:AllCoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
