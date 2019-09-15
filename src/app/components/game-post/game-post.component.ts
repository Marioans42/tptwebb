import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Game } from 'src/app/models/Game';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

@Component({
  selector: 'app-game-post',
  templateUrl: './game-post.component.html',
  styleUrls: ['./game-post.component.css']
})
export class GamePostComponent implements OnInit {

  game : Game
  id: number;
  isLoading : boolean

  constructor(private route: ActivatedRoute, private httpClient : HttpClient ) { }

  ngOnInit() {
    this.game = new Game();
    this.id = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id') : null;
    this.getGame();
  }

  getGame() {
    axios.get("https://server-tptm2.herokuapp.com/api/game/" + this.id)
    .then((res) => {
      if (res) {
          this.isLoading = false;
          this.game = res.data.game;
          console.log(this.game)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });
  }

}
