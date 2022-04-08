import { Component, OnInit } from '@angular/core';
import { IGame } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  myGames:IGame[];

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    let currUser = this.authService.getItem('userData');
    if(currUser !== null){
      currUser = currUser['objectId'];
    }

    this.gameService.loadGames().subscribe(data => {
     this.myGames = data['results'].filter(game => currUser && game.owner.objectId === currUser);
    })
  }

}
