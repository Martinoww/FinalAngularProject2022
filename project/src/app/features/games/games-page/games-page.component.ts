import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent implements OnInit, OnDestroy {


  gamesSubscription: Subscription
  searchSubscription: Subscription
  games: IGame[];
  gamesToShow: IGame[];
  search = new FormControl('')

  constructor(private gameService: GameService) { }



  ngOnInit(): void {
    this.gamesSubscription = this.gameService.loadGames().subscribe(gameList => {
        this.games = gameList['results'];
        this.gamesToShow = gameList['results'];
    })
    this.search.valueChanges.subscribe( searchTerm => {
      const searchResult = this.games.filter(game => game.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
      this.gamesToShow = searchResult;
    })
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe()
    this.searchSubscription.unsubscribe();
  }

  handleSearch(){
    // const searchParam = this.search.value;
    // const searchResult = this.games.filter(game => game.title.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase()));
    // this.gamesToShow = searchResult;      
  }

}
