import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(private formBuilder:FormBuilder, private http: HttpClient, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleLogin():void {
    let headers = new HttpHeaders()
    .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
    .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
    .set('X-Parse-Revocable-Session', '1')
    .set('Content-Type', 'application/json');

    this.http.post<any>(`${environment.apiUrl}login`, JSON.stringify(this.loginFormGroup.value), {'headers': headers}).subscribe(data =>{
      this.authService.setItem('userData', data)
    });
    this.route.navigate([`/games`]);
  }

}
