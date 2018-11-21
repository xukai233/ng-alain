import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'find-password',
  templateUrl: './find-password.component.html',
  styleUrls: ['./find-password.component.less']
})
export class FindPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { 

  }

  ngOnInit() {
    this.form = this.fb.group({
      userName    : [ null, [ Validators.required ] ],
      tenant: [null, Validators.required],
    });
  }

}
