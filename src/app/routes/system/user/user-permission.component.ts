import { Component, OnInit } from '@angular/core';
import { PermissionServiceProxy,PermissionDto,GrantedPermissionsDto} from '@serviceProxies/service-proxies';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.less']
})
export class UserPermissionComponent implements OnInit {
  accountGroupId:number;
  allPermission:PermissionDto[];
  permission:PermissionDto[];
  constructor(
    private _permissionServiceProxy:PermissionServiceProxy,
    private routerIonfo:ActivatedRoute
    ) { }
  data = [
    
  ]
  ngOnInit() {
    this.routerIonfo.params
    .subscribe((params:Params)=>{
      if(this.routerIonfo.snapshot.params["id"] && this.routerIonfo.snapshot.params["id"] > 0){
        this.accountGroupId = this.routerIonfo.snapshot.params["id"];
        this.getPermission(this.accountGroupId);
        
      }
    })
  }
  getPermission(accountGroupId:number){
    this._permissionServiceProxy
    .listByAccountGroupId(accountGroupId)
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
      console.log(this.data)
    })
  }

  getChildPermission(parentId:number|null){
    const childPermission = this.allPermission.filter(data=>data.parentId === parentId)
    if(!childPermission){
      return null;
    }
    let child = [];
    for(let chd of childPermission){
      child.push({
        id:chd.id,
        label:chd.displayName,
        key:chd.displayName,
        indeterminate:this.childChecked(chd.id),
        checked:this.childAllChecked(chd.id),
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
    if(this.permission.filter(data=>data.parentId === id).length > 0)
      return this.permission.filter(data=>data.parentId === id).length === this.allPermission.filter(data=>data.parentId === id).length;
    else
      return false;
  }

  getChildPer(item){
    let arr = [];
    if(item.child){
      if(item.child.indeterminate || item.child.checked){
        arr.push(item.child.id);
      }
    }
    return arr;
  }

  savePermission(){
    const grantedPermissiond = new GrantedPermissionsDto();
    let per = [];
    for(let item of this.data){
      if(item.indeterminate || item.checked){
         per.push(item.id)
      }
      per.push(this.getChildPer(item))
    }
    this._permissionServiceProxy
    .updateAccountGroupPermissions(this.accountGroupId,grantedPermissiond)
    .subscribe(re=>{
      this.ngOnInit();
    })
  }

  updateAllChecked(key){
    this.checkChange(key,this.data)
    this.savePermission();
  }
  updateMenuChecked(key){
    this.checkChange(key,this.data)
    for(let item of this.data){
       if(this.IsCheck(key,item.childs)){
         this.setParentStatus(item)
       }
    }
    this.savePermission();
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
    this.savePermission();
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
