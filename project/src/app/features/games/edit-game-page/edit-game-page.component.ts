import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-game-page',
  templateUrl: './edit-game-page.component.html',
  styleUrls: ['./edit-game-page.component.css'],
})
export class EditGamePageComponent implements OnInit {

  gameInfo:IGame
  paramId:string;


  editFormGroup: FormGroup = this.formBuilder.group({
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    description: new FormControl(
      '',
      [Validators.required, Validators.minLength(80)]
    ),
    price: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private activateRoute: ActivatedRoute, private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.paramId = this.activateRoute.snapshot.paramMap.get('id');
    
    this.gameService.loadGameById(this.paramId).subscribe(data => {
      this.editFormGroup.patchValue({title: data.title});
      this.editFormGroup.patchValue({imageUrl: data.imgURL});
      this.editFormGroup.patchValue({description: data.description});
      this.editFormGroup.patchValue({price: data.price});
      
    })

  }
  
  handleEditGame() {
   let headers = new HttpHeaders()
    .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
    .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
    .set('Content-Type', 'application/json');
    this.http.put<any>(`${environment.apiUrl}classes/Games/${this.paramId}`, JSON.stringify(this.editFormGroup.value), {'headers': headers}).subscribe(data =>{
      console.log(data);
    });
    this.route.navigate([`/games/details/${this.paramId}`])
  }
}
