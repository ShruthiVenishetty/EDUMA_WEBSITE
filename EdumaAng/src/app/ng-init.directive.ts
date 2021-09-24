import { Directive ,Input,Output,EventEmitter} from '@angular/core';

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {
  @Input() isLast: boolean;

  @Output('appNgInit') initEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.isLast) {
      setTimeout(() => this.initEvent.emit(), 10);
    }
  }

  constructor() { }

}
