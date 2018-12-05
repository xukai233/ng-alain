import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AccountListDto,UpdateAccountDto,AccountServiceProxy,AccountGroupServiceProxy,AccountGroupDto,AccountDto} from '@serviceProxies/service-proxies';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.css']
})
export class UserUpdateModalComponent implements OnInit {
  @ViewChild('updateModal') modal: NzModalRef;
  validateForm:FormGroup;
  loading = false;
  account:AccountDto;
  accountGroup:AccountGroupDto[];
  checkOptionsOne = [];
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private _accountService:AccountServiceProxy,
    private _accountGroupServiceProxy:AccountGroupServiceProxy
    ) { 

    this.validateForm = this.fb.group({
      userName:[ null, [ Validators.required ] ],
      email : [ null, [ Validators.email,Validators.required ] ],
      active : [ true ],
      accountGourps:[],
    });
    this.account = new AccountDto();
  }

  ngOnInit() {
  }

  show(data:AccountListDto):void {
    this.modal.open();
    this.getUser(data.id);
  }
  handleCancel(): void {
    this.modal.close();
    this.validateForm.reset();
  }

  _pushCheckBox(data,ids:number[]){
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

  getUserGroup(ids:number[]){
    this._accountGroupServiceProxy
    .list()
    .pipe(map(re=>re.items))
    .pipe(map(data=>this._pushCheckBox(data,ids)))
    .subscribe(items=>{
      this.accountGroup = items;
    })
  }

  getUser(userId:number):void {
    this._accountService
    .get(userId)
    .subscribe(re=>{
      this.account = re;
      this.getUserGroup(this.account.ownGroupIds);
    })
  }

  handleSubmit(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) {
      return;
    }


    let updateAccountDto = new UpdateAccountDto();
    updateAccountDto.isActive = this.account.isActive;
    updateAccountDto.displayName = this.account.displayName;
    updateAccountDto.email = this.account.email;
    updateAccountDto.accountGourps = []
    for(let item of this.checkOptionsOne){
      if(item.checked){
        updateAccountDto.accountGourps.push(new AccountGroupDto(this.accountGroup.find(m=>m.id === item.value)))
      }
    }
    this.loading = true;
    this._accountService
    .update(this.account.id,updateAccountDto)
    .subscribe(re=>{
      this.loading = false;
      this.modal.close();
      this.modalSave.emit(null);
    })
  }
}
