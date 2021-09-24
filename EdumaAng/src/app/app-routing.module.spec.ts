import { AboutUsComponent } from './about-us/about-us.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import {routes } from './app-routing.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { HomePageComponent } from './home-page/home-page.component';

describe('AppRoutingModule',()=>{
  it('should contain route for /home',()=>{
    expect(routes).toContain({path:'home',component:HomePageComponent});
  });
  it('when path is empty should redirect to /home',()=>{
    expect(routes).toContain({ path: '', redirectTo: 'home', pathMatch: 'full'});
  });
  it('should contain route for /event',()=>{
    expect(routes).toContain({path:"event", component:EventsPageComponent});
  });
  it('should contain route for /courseDescription',()=>{
    expect(routes).toContain({path:'course/:id',component:CoursePageComponent});
  });
  it('should contain route for /contact',()=>{
    expect(routes).toContain({path:'contact',component:ContactPageComponent});
  });
  it('should contain route for /about',()=>{
    expect(routes).toContain({path:'about',component:AboutUsComponent});
  });
  it('should contain route for /AllCourses',()=>{
    expect(routes).toContain({path:'AllCourses',component:AllCoursesComponent});
  });
});
