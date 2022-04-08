import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { LikeService } from 'src/app/core/services/like.service';

@Component({
  selector: 'app-game-detail-page',
  templateUrl: './game-detail-page.component.html',
  styleUrls: ['./game-detail-page.component.css']
})
export class GameDetailPageComponent implements OnInit {

  game:IGame;
  isOwner:boolean = false;
  paramId:any;
  likesCount: number = 0;
  hasLiked: boolean = false;
  likeId: string;
  currUser;
  currUserLikeId: string;
  isLiking: boolean = false;
  isDisliking: boolean = false;

  constructor(private gameService: GameService, private activateRoute: ActivatedRoute, private route: Router, private authService: AuthService, private likeService: LikeService) { }

  ngOnInit(): void {

    this.currUser = this.authService.getItem('userData');
    if(this.currUser !== null) {
      this.currUser = this.currUser['objectId']
    }
    
    this.paramId = this.activateRoute.snapshot.paramMap.get('id')
    
    this.gameService.loadGameById(this.paramId).subscribe(gameData => {
      this.game = gameData;
      this.isOwner = this.currUser === gameData.owner.objectId;
    })

    this.likesInfo();
    
  }

   likesInfo() {
    this.likeService.loadlikes().subscribe(likes =>{
      const currGameLikes = likes['results'].filter(item => item['Game']['objectId'] === this.paramId);

      this.likesCount = currGameLikes.length
      this.currUserLikeId = currGameLikes.filter(item => item['owner']['objectId'] === this.currUser).length === 0 ? [] : currGameLikes.filter(item => item['owner']['objectId'] === this.currUser)[0]['objectId']
      this.hasLiked = currGameLikes.some(item => item['owner']['objectId'] === this.currUser)
      
    })
  }

  handleDeleteGame(){
      
    const answer = confirm(`Are you sure that you want to delete ${this.game.title}?`);
      if(answer) {
       this.gameService.deleteGame(this.paramId).subscribe({
         next: () => {
          console.log('Delete successful');
          this.route.navigate(['/games']);
         } 
        });
      }else {
        return;
      } 

  }


  handleLike(){
    if(this.isLiking) {
      return;
    }
    this.isLiking = true
   const body = {
         Game: { __type: 'Pointer', className: 'Games', objectId: this.paramId },
         owner: { __type: 'Pointer', className: '_User', objectId: this.currUser }
   }
    this.likeService.createLike(body).subscribe({
      next: ()=> {
        this.likesInfo();
      },
      complete: () =>{
        this.isLiking = false;
      },
      error: ()=> {
        this.isLiking = false;
      }
    })

  }

  handleDislike(){
    if(this.isDisliking) {
      return;
    }
    this.isDisliking = true
    this.likeService.deleteLike(this.currUserLikeId).subscribe({
      next: ()=> {
        this.likesInfo();
      },
      complete: () =>{
        this.isDisliking = false;
      },
      error: ()=> {
        this.isDisliking = false;
      }
    })
  }

}
