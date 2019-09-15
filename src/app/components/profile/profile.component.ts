import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import {UploadService} from '../../services/upload.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { Technology } from 'src/app/models/Technology';
import { Platform } from 'src/app/models/Platform';
import { Game } from 'src/app/models/Game';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uploadForm: FormGroup;
  id: string;
  techno : Technology
  platform: Platform
  game : Game
  gameslist: Game []= []
  logged : string
  constructor(private formBuilder: FormBuilder,  private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.game = new Game();
    this.id = localStorage.getItem("user_id");
    this.getAllGames()
    this.getTechnology()
    this.getPlatform()
    this.logged = localStorage.getItem("user_info")
  }


  isLoading : boolean

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("hahahahah",file);
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    console.log(this.uploadForm.get('profile'))
    axios.post("http://localhost:3000/upload", formData).then(
      (res) => console.log("res" ,res),
      (err) => console.log(err)
    );
  }

  getAllGames() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/"+ this.id + "/Games")
    .then((res) => {
      if (res) {
        console.log("haha",res.data)
          this.isLoading = false;
           this.gameslist = res.data.game;
          console.log(this.gameslist)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });

  }

  getTechnology() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/technologies")
    .then((res) => {
      if (res) {
        console.log("haha",res.data)
          this.isLoading = false;
           this.techno = res.data.technology;
          console.log(this.techno)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });
  }

  getPlatform() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/platforms")
    .then((res) => {
      if (res) {
        console.log("haha",res.data)
          this.isLoading = false;
           this.platform = res.data.platforms;
          console.log(this.platform)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });

  }

  save(game: Game) {
    this.isLoading = true;
    axios.post("https://server-tptm2.herokuapp.com/api/game/newGame", game).then((log) => {
       if (log) {
         this.isLoading = false;
       } else {
         window.alert('Erreur');
         this.isLoading = false;
       }
     });
  }


}
