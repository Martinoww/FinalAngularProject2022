import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleCreateGame(){
    console.log('game created');
    
  }

}
