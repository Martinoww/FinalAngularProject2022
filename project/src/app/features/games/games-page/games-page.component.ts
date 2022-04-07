import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit {

  games: IGame[];
  gamesToShow: IGame[];
  search = new FormControl('')

  constructor(private gameService: GameService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.gameService.loadGames().subscribe(gameList => {
        this.games = gameList['results'];
        this.gamesToShow = gameList['results'];
    })
  }

  handleSearch(){
    const searchParam = this.search.value;
    const searchResult = this.games.filter(game => game.title.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase()));
    this.gamesToShow = searchResult;      
  }

}
