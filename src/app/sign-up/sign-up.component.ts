import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from './../User'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  constructor(private fb: FormBuilder) { }

  //Gender list for the select control element
  private genderList: string[];
  //Property for the user
  private user: User;

  signupForm: FormGroup;

  ngOnInit() {

    this.genderList = ['Male', 'Female', 'Others'];

    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormGroup({
        pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPwd: new FormControl('', [Validators.required, Validators.minLength(8)])
      }),

      gender: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    })



  }


  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);

      if(this.user.password.pwd!=this.user.password.confirmPwd)
       alert('Passwords do not match');
      /* Any API call logic via services goes here */
    }
  }

  get email() { return this.signupForm.get('email'); }

  get password() { return this.signupForm.get('password'); }

  get gender() { return this.signupForm.get('gender'); }

  get terms() { return this.signupForm.get('terms'); }

}
