import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AccountListDto,PermissionServiceProxy,PermissionDto,GrantedPermissionsDto} from '@serviceProxies/service-proxies';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'user-permission-modal',
  templateUrl: './user-permission-modal.component.html',
  styleUrls: ['./user-permission-modal.component.less']
})
export class UserPermissionModalComponent implements OnInit {
  @ViewChild('permissionModal') modal: NzModalRef;
  allPermission:PermissionDto[];
  permission:PermissionDto[];
  loading = false;
  accountId = 0;
  data = []
  modalStyle={
    paddingTop:'12px'
  }
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _permissionServiceProxy:PermissionServiceProxy,
    private message:NzMessageService,
  ) { }

  ngOnInit() {
  }

  handleCancel(){
    this.modal.close();
  }

  handleSubmit(){
    this.savePermission();
    this.modal.close();
    this.modalSave.emit(null);
  }

  show(data:AccountListDto){
    this.accountId = data.id;
    this.getPermission(this.accountId);
    this.modal.open();
  }

  getPermission(accountGroupId:number){
    this._permissionServiceProxy
    .listByAccountId(accountGroupId)
    .subscribe(re=>{
      this.getAllPermission();
      this.permission = re.items;
    })
  }

  getAllPermission(){
    this._permissionServiceProxy
    .listAll()
    .subscribe(re=>{
      this.allPermission = re.items;
      this.data = this.getChildPermission(null);
    })
  }

  savePermission(){
    const grantedPermissiond = new GrantedPermissionsDto();
    let per = [];
    this.loading = true;
    for(let item of this.data){
      if(item.indeterminate || item.checked){
         per.push(item.id)
      }
      if(item.childs){
        for(let child of item.childs){
          if(child.indeterminate || child.checked){
             per.push(child.id)
          }
          if(child.childs){
            for(let ch of child.childs){
              if(ch.indeterminate || ch.checked){
                 per.push(ch.id)
              }
            }
          }
        }
      }
    }
    grantedPermissiond.ids = per;
    this._permissionServiceProxy
    .updateAccountPermissions(this.accountId,grantedPermissiond)
    .subscribe(re=>{
      this.ngOnInit();
      this.loading = false;
      this.message.create("success","保存成功");
    })
  }

  getChildPermission(parentId:number|null){
    const childPermission = this.allPermission.filter(data=>data.parentId === parentId)
    if(!childPermission){
      return null;
    }
    let child = [];
    for(let chd of childPermission){
      const isAllChecked = this.childAllChecked(chd.id);
      child.push({
        id:chd.id,
        label:chd.displayName,
        key:chd.displayName,
        indeterminate:isAllChecked?false:this.childChecked(chd.id),
        checked:isAllChecked,
        description:chd.desc,
        childs:this.getChildPermission(chd.id)
      })
    }
    return child;
  }

  childChecked(id:number){
    return this.permission.filter(data=>data.parentId === id).length > 0;
  }

  childAllChecked(id:number){
    return this.permission.filter(data=>data.id === id).length > 0;
  }

  updateMenuChecked(key){
    this.checkChange(key,this.data)
    for(let item of this.data){
       if(this.IsCheck(key,item.childs)){
         this.setParentStatus(item)
       }
    }
  }
  updateItemChecked(key){
    this.checkChange(key,this.data)
    for(let item of this.data){
      for(let it of item.childs){
       if(this.IsCheck(key,it.childs)){
         this.setParentStatus(it)
         this.setParentStatus(item)
       }
      }
    }
  }

  checkChange(key,data){
    for(let item of data){
      if(item.key === key){
        let status = !item.checked
        item.checked = status;
        item.indeterminate = false;
        this.setChildStatus(item.childs,status);
      }else{
        if(item.childs instanceof Array){
          this.checkChange(key,item.childs)
        }
      }
    }
  }

  setChildStatus(data,status){
    if(data instanceof Array){
      for(let item of data){
        item.checked = status;
        item.indeterminate = false;
        if(item.childs){
          this.setChildStatus(item.childs,status)
        }
      }
    }
  }


  setParentStatus(data){
    let checkNum = 0;
    for(let item of data.childs){
      if(item.checked){
        checkNum++;
      }
    }
    if(checkNum == 0){
      data.checked = false;
      data.indeterminate = false;
    }else if (checkNum == data.childs.length){
      data.checked = true;
      data.indeterminate = false;
    }else{
      data.checked = false;
      data.indeterminate = true;
    }
  }

  IsCheck(key,data){
    for(let item of data){
      if(item.key === key){
        return true;
      }
    }
    return false;
  }


}
