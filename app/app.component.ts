import { Component } from '@angular/core';
import { User } from './shared/models/user';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})

export class AppComponent {
  message: string = 'Hello';
  users: User[] = [
    { id: 25, name: 'Kim', username: 'euisoo'},
    { id: 26, name: 'Nick', username: 'dadavi'},
    { id: 27, name: 'Holly', username: 'eee'}
  ]

  activeUser: User;

  selectUser(user) {
    this.activeUser = user;
  }

  onUserCreated(event) {
    console.log(event);
    this.users.push(event.user);
  }
}