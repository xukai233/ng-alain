import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'wimi-ciphertext',
  templateUrl: './wimi-ciphertext.component.html',
  styleUrls: ['./wimi-ciphertext.component.css']
})
export class WimiCiphertextComponent implements OnInit {
  @Input() text = ""
  showText = false;
  constructor() { }

  ngOnInit() {
  }

  handleEyeClick(){
    this.showText = !this.showText;
  }

}
