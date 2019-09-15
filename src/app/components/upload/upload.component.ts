import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import {UploadService} from '../../services/upload.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  id: string;
  constructor(private formBuilder: FormBuilder,  private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.id = localStorage.getItem("user_id");
    this.getAllGames()
  }

  games = []
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
           this.games = res.data.game;
          console.log(this.games)
      } else {
          window.alert('Erreur lors de la requette');
          this.isLoading = false;
      }
  });

  }

}
