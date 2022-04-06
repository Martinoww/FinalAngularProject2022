import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
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

  constructor(private formBuilder:FormBuilder, private http: HttpClient, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    let headers = new HttpHeaders()
    .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
    .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
    .set('X-Parse-Revocable-Session', '1')
    .set('Content-Type', 'application/json');
    const body = {};
    body['username'] = this.registerFormGroup.value.username;
    body['email'] = this.registerFormGroup.value.email;
    body['password'] = this.registerFormGroup.value.passwords.password;
    this.http.post<any>(`${environment.apiUrl}users`, body, {'headers': headers}).subscribe(data =>{
      this.authService.setItem('userData', data)
    });
    this.route.navigate([`/games`]);
    
  }

}
