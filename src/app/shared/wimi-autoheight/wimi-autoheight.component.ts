import { Component, OnInit, Input, HostListener,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'wimi-autoheight',
  templateUrl: './wimi-autoheight.component.html',
  styleUrls: ['./wimi-autoheight.component.less']
})
export class WimiAutoheightComponent implements OnInit {

  @Input() offsetY = 0;
  domHeight="0px";
  resize$ = new Subject<void>();
  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.updateHeight();
    this.resize$.pipe(debounceTime(300))
    .subscribe(() => {
      this.updateHeight();
    });
  }

  ngAfterViewInit(): void {
    this.updateHeight();
  }

  ngOnDestroy(): void {
    this.resize$.complete();
    this.resize$ = null;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }

  updateHeight():void{
    if (this.document) {
      const y = `${(this.document as Document).documentElement.offsetHeight - this.offsetY}px`;
      this.domHeight = y;
    }
  }

}
