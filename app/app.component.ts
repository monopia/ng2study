import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit{
  message: string = 'Hello';
  users: User[] = [
    { id: 25, name: 'Kim', username: 'Euisoodam'},
    { id: 26, name: 'Nick', username: 'Jack'},
    { id: 27, name: 'Holly', username: 'Spirit'}
  ]

  activeUser: User;

  selectUser(user: User) {
    this.activeUser = user;
  }

  onUserCreated(event) {
    console.log(event);
    this.users.push(event.user);
  }

  ngOnInit(): void {
    return;
  }
}