import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ContactPageComponent } from './contact-page.component';


describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onSubmit should make isSuccess true', () =>{
     component.onSubmit();
    expect(component.isSuccess).toBeTrue();

  });
  it('onSubmit should make display true', () =>{
     component.onSubmit();
     expect(component.display).toBeTrue();

  });

  it('AddForm should have four controls',()=>{
    component.onSubmit();
    expect(component.addForm.contains('email')).toBeTruthy();
    expect(component.addForm.contains('name')).toBeTruthy();
    expect(component.addForm.contains('subject')).toBeTruthy();
    expect(component.addForm.contains('message')).toBeTruthy();

  });
  it('should make email control required',()=>{
    let control=component.addForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make name control required',()=>{
    let control=component.addForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make subject control required',()=>{
    let control=component.addForm.get('subject');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
  it('should make message control required',()=>{
    let control=component.addForm.get('message');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

  });
});

