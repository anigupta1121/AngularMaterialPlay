import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import {User} from './../User'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email=  new FormControl('bob@example.com', Validators.required);
  constructor() { }

   //Gender list for the select control element
   private genderList: string[];
   //Property for the user
   private user:User;

   signupForm: FormGroup;
  
   ngOnInit() {
  
     this.genderList =  ['Male', 'Female', 'Others'];

     this.signupForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormGroup({
        pwd: new FormControl('',Validators.required),
        confirmPwd: new FormControl('',Validators.required)
      }),
      
      gender: new FormControl('',Validators.required),
      terms: new FormControl('',Validators.required)
  })
    
     
 }

}
