import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authSerivce: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.authSerivce._user) {
      this.navigate('home');
    } else {
      this.navigate('login');
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
