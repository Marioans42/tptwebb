import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { UploadService } from '../../services/upload.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import axios from 'axios';
import { Technology } from 'src/app/models/Technology';
import { Tag } from 'src/app/models/Tag';
import { Platform } from 'src/app/models/Platform';
import { Game } from 'src/app/models/Game';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean

  form: FormGroup;
  uploadForm: FormGroup;
  id: string;
  tag: Tag[];
  techno: Technology[];
  platform: Platform[];
  game: Game;
  gameslist: Game[] = [];
  logged: string;

  tags: any[] = [];
  technos: any[] = [];
  platforms: any[] = [];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  addCheckboxesTags(idtag) {
    // console.log("idtag", idtag)
    let ckecked = false;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i] == idtag) {
        ckecked = true;
        // console.log("index", i)
        // console.log(ckecked, this.tags.splice(i,1));
        this.tags.splice(i, 1);
      }
    }
    if (!ckecked) {
      this.tags.push(idtag);
    }
    console.log("tags", this.tags)
  }

  addCheckboxesTechnos(idtag) {
    // console.log("idtag", idtag)
    let ckecked = false;
    for (let i = 0; i < this.technos.length; i++) {
      if (this.technos[i] == idtag) {
        ckecked = true;
        // console.log("index", i)
        // console.log(ckecked, this.tags.splice(i,1));
        this.technos.splice(i, 1);
      }
    }
    if (!ckecked) {
      this.technos.push(idtag);
    }
    console.log("technos", this.technos)
  }

  addCheckboxesPlatfomrs(idtag) {
    // console.log("idtag", idtag)
    let ckecked = false;
    for (let i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i] == idtag) {
        ckecked = true;
        // console.log("index", i)
        // console.log(ckecked, this.tags.splice(i,1));
        this.platforms.splice(i, 1);
      }
    }
    if (!ckecked) {
      this.platforms.push(idtag);
    }
    console.log("platforms", this.platforms)
  }

  submit() {
    const selectedOrderIds = this.form.value.tags
      .map((v, i) => v ? this.tag[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

  ngOnInit() {
    this.game = new Game();
    this.id = localStorage.getItem("user_id");
    this.getAllGames()
    this.getTechnology()
    this.getPlatform()
    this.getTag()
    this.logged = localStorage.getItem("user_info")
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("hahahahah", file);
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    console.log("atoooo", this.uploadForm.get('profile'))
    // axios.post("http://localhost:3000/upload", formData).then(
    //   (res) => console.log("res" ,res),
    //   (err) => console.log(err)
    // );
  }

  getAllGames() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/" + this.id + "/Games")
      .then((res) => {
        if (res) {
          console.log("haha", res.data)
          this.isLoading = false;
          this.gameslist = res.data.game;
          console.log(this.gameslist)
        } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
        }
      });

  }

  getTag() {
    this.isLoading = true;
    axios.get("https://server-tptm2.herokuapp.com/api/game/tags")
      .then((res) => {
        if (res) {
          console.log("haha", res.data)
          this.isLoading = false;
          this.tag = res.data.tag;
          console.log(this.techno)
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
          console.log("haha", res.data)
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
          console.log("haha", res.data)
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
    game.technologies = this.technos;
    game.tags = this.tags;
    game.platforms = this.platforms;
    game.UsersID = localStorage.getItem('user_id');
    console.log(game)
    axios.post("https://server-tptm2.herokuapp.com/api/game/newGame", game).then((log) => {
      if (log) {
        console.log("")
        alert('Success')
        this.isLoading = false;
      } else {
        window.alert('Erreur');
        this.isLoading = false;
      }
    });
  }


}
