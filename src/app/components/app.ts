import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";


@Component({
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  template: `
    <app-header
      [authenticated]="auth.authenticated" [displayName]="auth.displayName"
      (signOut)="signOut()"></app-header>
    
    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {
  displayName:string;
  constructor(private auth: AuthService) {}

  signOut(): void {
    this.auth.signOut();
  }
}
