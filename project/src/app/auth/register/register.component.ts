import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  errMsg: string = '';
  emailIsAlreadyTaken:boolean = false;
  usernameIsAlreadyTaken:boolean = false;

passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

get passwordsGroup(): FormGroup {
  return this.registerFormGroup.controls['passwords'] as FormGroup;
}

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.pattern('.{1,}@.{2,}\..{1,3}')]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [passwordMatch(this.passwordControl)]),
    })
    
  })

  constructor(private formBuilder:FormBuilder, private route: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    this.userService.register$({username: this.registerFormGroup.value.username, password: this.registerFormGroup.value.passwords.password, email: this.registerFormGroup.value.email}).subscribe({
      next: () => {
        this.registerFormGroup.reset();
        this.route.navigate([`/games`]);
      },
      complete: () => {
        this.errMsg = ''
        this.emailIsAlreadyTaken = false;
        this.usernameIsAlreadyTaken = false;
        console.log('login completed');
        
      },
      error: (err) => {
        let message = err.error.error;

       if(message === 'Account already exists for this username.'){
          console.log('username here');
          
          this.usernameIsAlreadyTaken = true;
          this.emailIsAlreadyTaken = false;
        }else if(message === 'Account already exists for this email address.'){
          console.log('username here');
          this.emailIsAlreadyTaken = true
          this.usernameIsAlreadyTaken = false;
        }
        
        this.errMsg = message;
        console.log(message, this.usernameIsAlreadyTaken);
      }
    })
  }

}
