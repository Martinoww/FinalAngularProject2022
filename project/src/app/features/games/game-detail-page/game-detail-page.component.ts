import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-detail-page',
  templateUrl: './game-detail-page.component.html',
  styleUrls: ['./game-detail-page.component.css']
})
export class GameDetailPageComponent implements OnInit {

  game:IGame;

  paramId:any;

  constructor(private gameService: GameService, private activateRoute: ActivatedRoute, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.paramId = this.activateRoute.snapshot.paramMap.get('id')

    this.gameService.loadGameById(this.paramId).subscribe(gameData => {
      this.game = gameData;
      
    })
    
  }

  handleDeleteGame(){
      
    const answer = confirm(`Are you sure that you want to delete ${this.game.title}?`);
      if(answer) {
        let headers = new HttpHeaders()
        .set('X-Parse-Application-Id', 'gufQwjDzdsfVjsHkGCZgEgdUcRTqquBWGJvFdVjz')
        .set('X-Parse-REST-API-Key', 'XTtHwUdimgO1oNXXnazKB0SD4BusNQUQPjc6XTc8')
        .set('Content-Type', 'application/json');
        this.http.delete<any>(`${environment.apiUrl}classes/Games/${this.paramId}`, {'headers': headers}).subscribe(() =>{
          console.log('Delete successful');
        });
        this.route.navigate(['/games']);
      }else {
        return;
      } 

  }

}
