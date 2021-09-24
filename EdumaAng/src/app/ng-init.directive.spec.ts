import { fakeAsync, tick } from '@angular/core/testing';
import { NgInitDirective } from './ng-init.directive';

describe('NgInitDirective', () => {
  it('should create an instance', () => {
    const directive = new NgInitDirective();
    expect(directive).toBeTruthy();
  });
  it('Should call initEvent',fakeAsync(()=>{
    const directive = new NgInitDirective();
    spyOn(directive.initEvent, 'emit');
    directive.isLast = true;
    directive.ngOnInit();
    tick(10);
    expect(directive.initEvent.emit).toHaveBeenCalled();
  }));
});
