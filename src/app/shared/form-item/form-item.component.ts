import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'wimi-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.less']
})
export class FormItemComponent implements OnInit {
  @Input() text = ""
  constructor() { }

  ngOnInit() {
  }

}
