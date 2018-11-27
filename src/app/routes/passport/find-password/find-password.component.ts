import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'find-password',
  templateUrl: './find-password.component.html',
  styleUrls: ['./find-password.component.less']
})
export class FindPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,) { 

  }

  ngOnInit() {
    this.form = this.fb.group({
      userName    : [ null, [ Validators.required ] ],
      tenant: [null, Validators.required],
    });
  }

  onCancle(){
    this.router.navigate(['/passport/login']);
  }

}
