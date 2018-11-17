import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional,Injector} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less'],
  providers: [SocialService],
})
export class ResetPasswordComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
  ) {
    this.form = fb.group({
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      password: [null, Validators.required],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get checkPassword() {
    return this.form.controls.checkPassword;
  }
  get password() {
    return this.form.controls.password;
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // region: get captcha

  count = 0;
  interval$: any;


  // endregion

  submit() {
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    this.checkPassword.markAsDirty();
    this.checkPassword.updateValueAndValidity();
  }

  onCancle(){
    this.router.navigate(['/passport/login']);
  }

  // endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
