import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';

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


  constructor(private formBuilder: FormBuilder, private gameService: GameService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleCreateGame(){
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
    
    this.gameService.createGame(body).subscribe({
      next: () => {
        this.router.navigate(['/games']);
      },
    })

    
  }

}
