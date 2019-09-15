import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLogged = false
  userLogged : string

  constructor(private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem('user_id') != null) {
      console.log(localStorage.getItem('user_id'));
      this.isLogged = true
      this.userLogged = localStorage.getItem('user_info')
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
