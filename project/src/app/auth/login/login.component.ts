import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  errMsg: string = '';
  isUsernameOrPasswordInvalid :boolean = false;

  loginFormGroup:FormGroup = this.formBuilder.group({
    'username': new FormControl(null,[ Validators.required, Validators.minLength(3)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  constructor(private formBuilder:FormBuilder, private route: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  handleLogin():void {
    this.userService.login$(this.loginFormGroup.value).subscribe({
      next: ()=> {
        this.loginFormGroup.reset()
        this.route.navigate([`/games`]);
      },
      complete: () => {
        this.errMsg = '';
        this.isUsernameOrPasswordInvalid = false;
        console.log('login completed');
        
      },
      error: (err) => {
        this.errMsg = err.error.error;
        this.isUsernameOrPasswordInvalid = true;
        console.log(err.error.error);
      }
    })
  }

}
