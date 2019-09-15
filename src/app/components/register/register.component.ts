import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User
  isLoading : boolean

  constructor(private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.user = new User();
  }

  register(user: User) {
    this.isLoading = true;
    this.dataService.post("https://server-tptm2.herokuapp.com/api/user/auth/signup", user).subscribe((log) => {
       if (log) {
         this.router.navigate(['/home']);
         this.isLoading = false;
       } else {
         window.alert('Erreur');
         this.isLoading = false;
       }
     });
  }

}
