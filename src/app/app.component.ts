import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderMobileComponent,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  isLoginPage = false;

  constructor(private router: Router) {
    this.isLoginPage = this.router.url.startsWith('/login');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.isLoginPage = (event as NavigationEnd).urlAfterRedirects.startsWith('/login');
    });
  }
}
