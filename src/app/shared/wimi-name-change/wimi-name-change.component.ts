import { Component, OnInit, Input, ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'wimi-name-change',
  templateUrl: './wimi-name-change.component.html',
  styleUrls: ['./wimi-name-change.component.less']
})
export class WimiNameChangeComponent implements OnInit {
  @Input() text:string;
  @ViewChild('changeNameInput')
  changeNameInput: any;
  isEdit = false;
   @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private message: NzMessageService,
  ) { }

  ngOnInit() {
  }

  handleClick(){
    this.isEdit = true;
    setTimeout(()=>{
      this.changeNameInput.nativeElement.focus()
    },100)
  }

  handleCancle(){
    this.isEdit = false;
  }

  handleChangeName(event){
    if(event.keyCode == 27){
      this.isEdit = false;
      return;
    }
    if(event.keyCode == 13){
      if(!this.text){
        this.message.create('error','请填写内容')
        return false;
      }else{
        this.isEdit = false;
        this.onSave.emit(this.text);
      }
    }
  }
}
