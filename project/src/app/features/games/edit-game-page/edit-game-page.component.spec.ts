import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGamePageComponent } from './edit-game-page.component';

describe('EditGamePageComponent', () => {
  let component: EditGamePageComponent;
  let fixture: ComponentFixture<EditGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
