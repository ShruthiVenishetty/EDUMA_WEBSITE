import { HttpClient, HttpClientModule, HttpHeaderResponse, HttpResponse, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { tick, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EdumaDetailsService } from '../shared/eduma-details.service';
import { NavBarViewComponent } from './nav-bar-view.component';
import {delay} from 'rxjs/operators';
import { HttpTestingController } from '@angular/common/http/testing';

describe('NavBarViewComponent', () => {
  let component: NavBarViewComponent;
  let fixture: ComponentFixture<NavBarViewComponent>;
  let router:Router;
  let service:EdumaDetailsService;
  let element;
  let http:HttpTestingController;
  let res=[{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIxQGdtYWlsLmNvbSIsIm5iZiI6MTYzMDU2MzkzMiwiZXhwIjoxNjMwNjUwMzMyLCJpc3MiOiJsb2NhbGhvc3QuY29tIiwiYXVkIjoibG9jYWxob3N0LmNvbSJ9.5iiQp9uyzapXA4t2gEN91EsJA5rPjqUJoP9ZWcQxEcI",
    "expires_in": 86400,
    "token_type": "bearer",
    "creation_Time": 1630563932,
    "expiration_Time": 1630650332
  }];
  let edumaService : jasmine.SpyObj<EdumaDetailsService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarViewComponent ],
      // providers:[{provide : EdumaDetailsService, useValue: edumaService},FormBuilder,Validators],
      providers:[EdumaDetailsService,FormBuilder,Validators,HttpTestingController],
      imports:[RouterTestingModule,HttpClientModule]


    })
    .compileComponents();
  });
  beforeEach(inject([EdumaDetailsService], (s: EdumaDetailsService) => {
    service = s;
    fixture = TestBed.createComponent(NavBarViewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // edumaService = TestBed.get(EdumaDetailsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('On clicking show button should create Login form with 2 controls',()=>{
    component.show();
    expect(component.LoginForm.contains('email')).toBeTruthy();
    expect(component.LoginForm.contains('password')).toBeTruthy();

  });
  it('should make email control required',()=>{
    let control=component.LoginForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make password control required',()=>{
    let control=component.LoginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('Login Form Password must be atleast 5 characters',()=>{
    let control=component.LoginForm.get('password');
    control?.setValue('shru');
    expect(control?.valid).toBeFalsy();

  });
  it('Login Form Password must be atleast 5 characters',()=>{
    let control=component.LoginForm.get('password');
    control?.setValue('shruthi');
    expect(control?.valid).toBeTruthy();

  });

  it('On clicking showRegister button should create Register form with 4 controls',()=>{
    component.showRegister();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('username')).toBeTruthy();
    expect(component.registerForm.contains('Repassword')).toBeTruthy();


  });
  it('should make register email control required',()=>{
    let control=component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make register password control required',()=>{
    let control=component.registerForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make register username control required',()=>{
    let control=component.registerForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make register Re password control required',()=>{
    let control=component.registerForm.get('Repassword');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });

  it('Registration Form Password must be atleast 5 characters',()=>{
    let control=component.registerForm.get('password');
    control?.setValue('shru');
    expect(control?.valid).toBeFalsy();

  });
  it('Registration Form Password must be atleast 5 characters',()=>{
    let control=component.registerForm.get('password');
    control?.setValue('shruthi');
    expect(control?.valid).toBeTruthy();

  });

  it('Registration Form Repassword must be atleast 5 characters',()=>{
    let control=component.registerForm.get('Repassword');
    control?.setValue('shru');
    expect(control?.valid).toBeFalsy();

  });
  it('Registration Form Repassword must be atleast 5 characters',()=>{
    let control=component.registerForm.get('Repassword');
    control?.setValue('shruthi');
    expect(control?.valid).toBeTruthy();

  });
  it('OnRegister should make submit true',()=>{
   component.onRegister();
   expect(component.submitted).toBeTrue();
  });
  it('OnRegister if invalid returns null',()=>{
    component.registerForm.setErrors({ 'invalid': true });
    let result=component.onRegister();
    expect(result).toBeUndefined();
  });
  it('If both passwords do not match should return message',()=>{
    component.registerForm.controls['password'].setValue('shruthi');
    component.registerForm.controls['Repassword'].setValue('shrut');
    component.registerForm.controls['username'].setValue('shruthi');
    component.registerForm.controls['email'].setValue('shruthi@gmail.com');
    component.onRegister();
    expect(component.passwordMatch).toBeTrue();
    expect(component.PasswordMatchMessage).toEqual('Both Passwords must match');

  });
  it('if both passwords match ',()=>{
    component.registerForm.controls['password'].setValue('JhonDoe');
    component.registerForm.controls['Repassword'].setValue('JhonDoe');
    component.registerForm.controls['username'].setValue('JhonDoe');
    component.registerForm.controls['email'].setValue('johnDoe@gmail.com');
   spyOn(service, 'registerPage').and.returnValue(of(new HttpResponse({status:200})));
    component.onRegister();
    fixture.detectChanges();
   expect(component.showModalRegister).toBeFalse();
   expect(component.showModal).toBeTrue();

  });
  it('onLogin should make submit true',()=>{
    component.onLogin();
    expect(component.submitted).toBeTrue();
   });
  it('onLogout should make userLoggedIn false',()=>{
    component.onLogout();
    expect(component.isUserLoggedIn).toBeFalse();
    expect(localStorage.getItem('isUserLoggedIn')).toBe('false');
   });
  it('Hide should make showModal and showModalRegister false',()=>{
    component.hide();
    expect(component.showModal).toBeFalse();
    expect(component.showModalRegister).toBeFalse();
   });

   it('onLogin if invalid returns null',()=>{
     component.LoginForm.setErrors({ 'invalid': true });
     let result=component.onLogin();
     expect(result).toBeUndefined();
   });

  it('on successfull login, isUserLogged is true',()=>{
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');

    spyOn(service, 'login').and.returnValue(of(new HttpResponse({status:200})));
    component.onLogin();
    expect(component.isUserLoggedIn).toBeTrue();
    expect(localStorage.getItem('isUserLoggedIn')).toBe('true');

  });
  it('on Unsuccessfull login, isUserLogged is false',()=>{
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');

    spyOn(service, 'login').and.returnValue(of(new HttpResponse({status:404})));
    component.onLogin();
    expect(component.isUserLoggedIn).toBeFalse();
    expect(localStorage.getItem('isUserLoggedIn')).toBe('false');

  });
  it('onLogin makes show modal false',()=>{
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');

    spyOn(service, 'login').and.returnValue(of(new HttpResponse({status:200})));
    component.onLogin();
    expect(component.showModal).toBeFalse();
  });

  it('registerPage should throw error when method is Bad Request',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:400,statusText:'Bad Request'};
    spyOn(service,'registerPage').and.returnValue(throwError(mockErrorResponse))
    component.registerForm.controls['password'].setValue('JhonDoe');
    component.registerForm.controls['Repassword'].setValue('JhonDoe');
    component.registerForm.controls['username'].setValue('JhonDoe');
    component.registerForm.controls['email'].setValue('johnDoe@gmail.com');
    component.onRegister();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('registerPage should throw error when there is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'registerPage').and.returnValue(throwError(mockErrorResponse))
    component.registerForm.controls['password'].setValue('JhonDoe');
    component.registerForm.controls['Repassword'].setValue('JhonDoe');
    component.registerForm.controls['username'].setValue('JhonDoe');
    component.registerForm.controls['email'].setValue('johnDoe@gmail.com');
    component.onRegister();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('registerPage should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'registerPage').and.returnValue(throwError(mockErrorResponse))
    component.registerForm.controls['password'].setValue('JhonDoe');
    component.registerForm.controls['Repassword'].setValue('JhonDoe');
    component.registerForm.controls['username'].setValue('JhonDoe');
    component.registerForm.controls['email'].setValue('johnDoe@gmail.com');
    component.onRegister();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('registerPage should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'registerPage').and.returnValue(throwError(mockErrorResponse))
    component.registerForm.controls['password'].setValue('JhonDoe');
    component.registerForm.controls['Repassword'].setValue('JhonDoe');
    component.registerForm.controls['username'].setValue('JhonDoe');
    component.registerForm.controls['email'].setValue('johnDoe@gmail.com');
    component.onRegister();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('login should throw error when method is Bad Request',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:400,statusText:'Bad Request'};
    spyOn(service,'login').and.returnValue(throwError(mockErrorResponse))
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');
    component.onLogin();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('login should throw error when there is not found',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:404,statusText:'Not Found'};
    spyOn(service,'login').and.returnValue(throwError(mockErrorResponse))
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');
    component.onLogin();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('login should throw error when there is internal server issue',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:500,statusText:'Internal server issue'};
    spyOn(service,'login').and.returnValue(throwError(mockErrorResponse))
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');
    component.onLogin();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });
  it('login should throw error when WebAPI is not running',()=>{
    http=TestBed.inject(HttpTestingController);
    const mockErrorResponse = { status:0,statusText:'No Response'};
    spyOn(service,'login').and.returnValue(throwError(mockErrorResponse))
    component.LoginForm.controls['email'].setValue('mockUser@gmail.com');
    component.LoginForm.controls['password'].setValue('mockUser');
    component.onLogin();
    expect(component.errorResponse.status).toBe(mockErrorResponse.status);
    expect(component.errorResponse.statusText).toBe(mockErrorResponse.statusText);
  });

});
