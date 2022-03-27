import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

get passwordsGroup(): FormGroup {
  return this.registerFormGroup.controls['passwords'] as FormGroup;
}

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [passwordMatch(this.passwordControl)]),
    })
    
  })

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    console.log('register completed');
    
  }

}
