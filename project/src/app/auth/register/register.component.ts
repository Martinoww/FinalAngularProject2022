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
        this.route.navigate([`/games`]);
      },
      complete: () => {
        console.log('register stream completed');
      },
      error: (err) => {
        alert(err);
      }
    })
  }

}
