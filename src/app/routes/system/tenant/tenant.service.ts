import { Injectable } from '@angular/core';
import { TenantDto,TenantServiceProxy,FilterTenantsDto,PagedResultDtoOfTenantListDto,UpdateTenantDto,CreateTenantDto,TenantListDto} from '@serviceProxies/service-proxies';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  readonly data$ = new Subject<PagedResultDtoOfTenantListDto>();
  readonly loading$ = new Subject<boolean>();
  filterTenants:FilterTenantsDto;

  constructor(
    private _tenantService: TenantServiceProxy,
  ) 
  { 
    this.filterTenants = new FilterTenantsDto();
    this.filterTenants.pageSize = 10;
    this.filterTenants.pageIndex = 1;
  }

  list(filterTenants: FilterTenantsDto): void {
    this.loading$.next(true);
    this._tenantService
      .list(filterTenants)
      .subscribe(result => {
        this.data$.next(result);
        this.loading$.next(false);
      });
  }

  create(tenant:CreateTenantDto):Observable<void> {
    return this._tenantService
    .add(tenant)
    .pipe(finalize(() => this.loading$.next(false)))
    .pipe(finalize(() => this.list(this.filterTenants)))
  }

  stop(tenant:TenantListDto):void{
    tenant.isActive = !tenant.isActive;
    this._tenantService
    .update(tenant.id,tenant as UpdateTenantDto)
    .subscribe(()=>{
      this.list(this.filterTenants)
    })
  }

  update(id:number,tenant:UpdateTenantDto):Observable<void>{
    return this._tenantService
    .update(id,tenant)
    .pipe(finalize(()=>this.loading$.next(false)))
    .pipe(finalize(() => this.list(this.filterTenants)))
  }

  get(id:number):Observable<TenantDto>{
    return this._tenantService
    .get(id);
  }
}
