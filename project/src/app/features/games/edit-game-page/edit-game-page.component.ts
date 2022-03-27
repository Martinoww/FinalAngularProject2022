import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-edit-game-page',
  templateUrl: './edit-game-page.component.html',
  styleUrls: ['./edit-game-page.component.css'],
})
export class EditGamePageComponent implements OnInit {
  editFormGroup: FormGroup = this.formBuilder.group({
    imageUrl: new FormControl('ImageURL-test', [
      Validators.required,
      Validators.minLength(6),
    ]),
    title: new FormControl('Title Test', [
      Validators.required,
      Validators.minLength(2),
    ]),
    description: new FormControl(
      'Description-test Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam excepturi necessitatibus odio magni labore architecto hic neque asperiores, natus beatae dolorum obcaecati deserunt cupiditate ipsa illo, sed magnam. Tempora itaque officiis quod, dolores aspernatur amet! Quia quae, facere repellat obcaecati tempora doloribus, explicabo ipsam fuga architecto, inventore itaque modi voluptatum!',
      [Validators.required, Validators.minLength(80)]
    ),
    price: new FormControl('12.99', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  handleEditGame() {
    console.log('game created', this.editFormGroup);
  }
}
