import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import { Game } from 'src/app/models/Game';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games = []
  isLoading : boolean

  constructor(private httpClient : HttpClient,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/allGame")
    .then((res) => {
      if (res) {
        console.log("haha",res.data)
          this.isLoading = false;
           this.games = res.data.game;
          console.log(this.games)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });

  }

  goTo(id: number) {
    this.router.navigate(['/game/' + id]);
  }



}
