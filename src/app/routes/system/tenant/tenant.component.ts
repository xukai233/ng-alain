import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ApiServiceProxies, FilterTanantsInputDto} from '@shared/service-proxies/service-proxies';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';


@Component({
  selector: 'tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.less']
})
export class TenantComponent implements OnInit {
  breadcrumb = [
    {title:'host',link:'/page/dashboard'},
    {title:'系统'},
    {title:'租户'},
  ];
  isCollapse = true;
  modalIsVisible = false;
  dataSet = [];
  validateForm: FormGroup;
  rangePickerStyle = {
    "width":"100%"
  };
  filterQuery: FilterTanantsInputDto;

  constructor(private fb: FormBuilder,
    private _apiService: ApiServiceProxies,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService) { 
    }

  ngOnInit() {
    const token = this.tokenService.get();

    this._apiService.listTenants(this.filterQuery).subscribe(result => {
      this.dataSet = result.items;
    });
    this.validateForm = this.fb.group({
      TenantCode       : [ null, [ Validators.required ] ],
      TenantName       : [ null, [ Validators.required ] ],
      email            : [ null, [ Validators.email,Validators.required ] ],
      randomCode       : [ true ],
      password         : [ null, [ Validators.required ] ],
      passwordCheck         : [ null, [ Validators.required ] ],
      needPassword      : [ true ],
      enable          : [ true ],
      subDate          : [ 'A'],
      
    });
  }
  toggleCollapse(){
    this.isCollapse = !this.isCollapse
  }
  handleTenantAdd(){
    this.modalIsVisible = true;
  }

  handleCancel(): void {
    this.modalIsVisible = false;
  }
  submitTenantAddForm(): void {
    //this.modalIsVisible = false;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }
}
