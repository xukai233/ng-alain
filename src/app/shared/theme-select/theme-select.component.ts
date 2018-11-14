import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.less']
})
export class ThemeSelectComponent implements OnInit {
  @Input() select = false;
  @Input() title = "默认（微茗标准色）"
  @Input() MainColor = "blue"
  @Input() ShadowColor = "blue"
  constructor() { }

  ngOnInit() {
  }

}
