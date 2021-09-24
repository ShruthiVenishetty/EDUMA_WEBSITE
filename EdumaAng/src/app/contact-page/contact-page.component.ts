import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
isSuccess:boolean;
display:boolean;
addForm:FormGroup;
  constructor() {

  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      subject: new FormControl('',Validators.required),
      message:new FormControl('',Validators.required),
   });
  }
  onSubmit(){
    this.isSuccess=true;
   this.display=true;
  }

}
