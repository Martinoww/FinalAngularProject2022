import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.css']
})
export class CreateGamePageComponent implements OnInit {

  createFormGroup: FormGroup = this.formBuilder.group({
    'imageUrl': new FormControl(null, [ Validators.required, Validators.minLength(6)]),
    'title': new FormControl(null, [ Validators.required, Validators.minLength(2)]),
    'description': new FormControl(null, [ Validators.required, Validators.minLength(80)]),
    'price': new FormControl(null, [ Validators.required]),
  })


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleCreateGame(){
    let headers = new HttpHeaders()
    .append('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
    .append('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
    .append('Content-Type', 'application/json');
    
    const ownerId = this.authService.getItem('userData');
    
    let body = {
      'imgURL': this.createFormGroup.value.imageUrl,
      'title': this.createFormGroup.value.title,
      'description': this.createFormGroup.value.description,
      'price': this.createFormGroup.value.price,
      'owner': {
        '__type': 'Pointer',
        'className': '_User',
         'objectId': ownerId['objectId']
      },
    }
    
    this.httpClient.post<any>(`${environment.apiUrl}classes/Games`, JSON.stringify(body), {'headers': headers}).subscribe({
      next: () => {
        this.router.navigate(['/games']);
      },
    })

    
  }

}
