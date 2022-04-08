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
        this.route.navigate([`/games`]);
      },
      complete: () => {
      },
      error: (err) => {
        alert(err);
      }
    })
  }

}
