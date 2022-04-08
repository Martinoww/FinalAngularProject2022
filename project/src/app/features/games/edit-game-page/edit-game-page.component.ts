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

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private activateRoute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    this.paramId = this.activateRoute.snapshot.paramMap.get('id');
    
    this.gameService.loadGameById(this.paramId).subscribe(data => {
      this.editFormGroup.patchValue({title: data.title});
      this.editFormGroup.patchValue({imageUrl: data.imgURL});
      this.editFormGroup.patchValue({description: data.description});
      this.editFormGroup.patchValue({price: data.price});
      this.gameInfo = data;
    })

  }
  
  handleEditGame() {
    let body = {
      'imgURL': this.editFormGroup.value.imageUrl,
      'title': this.editFormGroup.value.title,
      'description': this.editFormGroup.value.description,
      'price': this.editFormGroup.value.price,
    }

    this.gameService.editGame(this.paramId, body).subscribe({
      next: () => {
        this.route.navigate([`/games/details/${this.paramId}`])
      },
    });
    
  }
}
