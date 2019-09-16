import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {DataService} from '../../services/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User
  isLoading : boolean
  constructor(
    private router: Router,
    private authData: LoginService,
    private dataService: DataService) { }

    static updateLocalStorage(log: any) {
    localStorage.setItem('user_info', log.name);
    localStorage.setItem('user_id', log.id);

  }

  ngOnInit() {
    this.user = new User();
    this.isLoading = false;
    localStorage.clear();
  }

  auth(user: User) {
    this.isLoading = true;
    this.dataService.post("https://server-tptm2.herokuapp.com/api/user/auth/signin", user).subscribe((log) => {
       if (log) {
         console.log("log", log)
         LoginComponent.updateLocalStorage(log);
         this.router.navigate(['/home']);
         this.isLoading = false;
       } else {
         window.alert('Erreur');
         this.isLoading = false;
       }
     });
  }

}
