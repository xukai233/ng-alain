import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CreateAccountDto, AccountServiceProxy,AccountGroupServiceProxy,AccountGroupDto } from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent implements OnInit {
  @ViewChild('createModal') modal: NzModalRef;
  validateForm:FormGroup;
  account:CreateAccountDto;
  checkOptionsOne = [];
  accountGroup:AccountGroupDto[];
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  loading = false;
  constructor(
    private fb: FormBuilder,
    private _accountService:AccountServiceProxy,
    private _accountGroupServiceProxy:AccountGroupServiceProxy
    ) { 

    this.validateForm = this.fb.group({
      userCode:[ null, [ Validators.required ] ],
      userName:[ null, [ Validators.required ] ],
      email : [ null, [ Validators.email,Validators.required ] ],
      password:[ null, [ Validators.required ] ],
      checkPassword:[ null, [ Validators.required,this.confirmationValidator ] ],
      avatar:[ null, [ Validators.required ] ],
      needPassword : [ true ],
      active : [ true ],
      accountGourps:[],
    });

    this.account = new CreateAccountDto();
  }
  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
  ngOnInit() {

  }
  show() {
    this.modal.open();
    this.getUserGroup()
  }

  handleCancel() {
    this.modal.close();
    this.validateForm.reset();
  }

  handleSubmit(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.invalid) {
      return;
    }
    this.account.accountGourps = [];
    for(let item of this.checkOptionsOne){
      if(item.checked){
        this.account.accountGourps.push(new AccountGroupDto(this.accountGroup.find(m=>m.id === item.value)))
      }
    }
    this.loading = true;
    this._accountService
    .add(this.account)
    .subscribe(re=>{
      this.loading = false;
      this.modal.close();
      this.modalSave.emit(null);
    })
  }

  getUserGroup(){
    this._accountGroupServiceProxy
    .list()
    .pipe(map(re=>re.items))
    .subscribe(items=>{
      this.accountGroup = items;
      this._pushCheckBox(items)
    })
  }

  _pushCheckBox(data,ids:number[] = []){
    this.checkOptionsOne = [];
    return data.map(item=>{
      this.checkOptionsOne.push({
        label: item.displayName, 
        value: item.id, 
        checked: ids?ids.indexOf(item.id) >= 0:false
      })
      return {...item} as AccountGroupDto
    })
  }
}
