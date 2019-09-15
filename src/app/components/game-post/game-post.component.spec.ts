import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePostComponent } from './game-post.component';

describe('GamePostComponent', () => {
  let component: GamePostComponent;
  let fixture: ComponentFixture<GamePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
