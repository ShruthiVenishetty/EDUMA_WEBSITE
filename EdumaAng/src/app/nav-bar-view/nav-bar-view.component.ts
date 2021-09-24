import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EdumaDetailsService } from '../shared/eduma-details.service';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../shared/eduma-details.model';
import { HttpStatusCode } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar-view',
  templateUrl: './nav-bar-view.component.html',
  styleUrls: ['./nav-bar-view.component.css'],
})
export class NavBarViewComponent implements OnInit {

  showModal: boolean=false;
  registerForm: FormGroup;
  submitted = false;
  showModalRegister:boolean=false;
  LoginForm:FormGroup;
  showNav:boolean;
  checked = 0;
 isCollapsed = true;
 emailId:string;
 password:string;
isUserLoggedIn:boolean=false;
passwordMatch:boolean=false;
registration:Register=new Register();
PasswordMatchMessage:string;
userRegistered:boolean=false;
errorResponse:any;




  constructor(private formBuilder: FormBuilder, private router:Router,private service:EdumaDetailsService) { }

  show()
  {
    this.showModal = true;
console.log("This is login");
  }
  showRegister(){
    this.showModalRegister = true;
  }
  hide()
  {
    this.showModal = false;
    this.showModalRegister = false;

  }
  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.registerForm = this.formBuilder.group({
      username:['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      Repassword: ['', [Validators.required, Validators.minLength(5)]]
  });
}
onLogout()
{
  this.isUserLoggedIn=false;
  localStorage.setItem('isUserLoggedIn',"false");
}
get f()
{
  return this.registerForm.controls;

}
get l(){
  return this.LoginForm.controls;
}

onRegister()
{
  this.submitted = true;
  if (this.registerForm.invalid) {
      return;
  }
  if(this.submitted)
  {
    if(this.registerForm.controls['password'].value == this.registerForm.controls['Repassword'].value)
    {

     this.registration.userName=this.registerForm.controls['username'].value;
     this.registration.email=this.registerForm.controls['email'].value;
     this.registration.password=this.registerForm.controls['password'].value;
     this.service.registerPage(this.registration).subscribe(response=>{
       var res=response.status;
       if(res==200)
       {
         this.showModalRegister = false;
         this.showModal=true;
       }
     },err=>this.errorResponse=err);
    }
    else
    {
      this.passwordMatch=true;
      this.PasswordMatchMessage="Both Passwords must match";

    }

  }

}


onLogin(){
  this.submitted = true;
console.log(this.submitted);
  if (this.LoginForm.invalid) {
      return;
  }
    if(this.submitted)
    {
      this.emailId=this.LoginForm.controls['email'].value;
      this.password = this.LoginForm.controls['password'].value;

      this.service.login(this.emailId, this.password)
          .subscribe(response => {
            var res = response.status;
            console.log(res);

            if(res==200)
            {
                localStorage.setItem('isUserLoggedIn',"true");
                this.isUserLoggedIn=true;


              }
              else
              {
                localStorage.setItem('isUserLoggedIn',"false");
                this.isUserLoggedIn=false;


              }
            },err=>this.errorResponse=err
            );
            this.showModal = false;
      }

    }

}

