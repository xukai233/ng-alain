import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.less']
})
export class UserPermissionComponent implements OnInit {
  constructor() { }
  data = [
    {
      label:"系统",
      key:"系统",
      indeterminate:true,
      checked:false,
      description:"系统功能描述系统功能描述系统功能描述系统功能描述系统功能描述系统功能描述",
      childs:[
        {
           label:"用户管理",
           key:"用户管理",
           checked:false,
           indeterminate:true,
           childs:[
            { label: '新建',key:'新建', value: '1', checked: true },
            { label: '编辑',key:'编辑', value: '2', checked: false },
            { label: '删除',key:'删除', value: '3', checked: false }
           ]
        },{
          label:"用户权限管理",
          key:"用户权限管理",
          checked:true,
          indeterminate:false,
          childs:[
            { label: '权限管理1',key:"权限管理1", value: '1', checked: true },
            { label: '权限管理2',key:"权限管理2", value: '1', checked: true },
            { label: '权限管理3',key:"权限管理3", value: '1', checked: true },
            { label: '权限管理4',key:"权限管理4", value: '1', checked: true },
            { label: '权限管理5',key:"权限管理5", value: '1', checked: true },
            { label: '权限管理6',key:"权限管理6", value: '1', checked: true },
            { label: '权限管理7',key:"权限管理7", value: '1', checked: true },
            { label: '权限管理8',key:"权限管理8", value: '1', checked: true },
            { label: '权限管理9',key:"权限管理9", value: '1', checked: true }
          ]
        }
      ]
    }
  ]
  ngOnInit() {
  }
  updateAllChecked(key){
    this.checkChange(key,this.data)
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
