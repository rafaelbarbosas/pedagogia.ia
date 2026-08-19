import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { UserProfileMenuComponent } from './components/user-profile-menu/user-profile-menu.component';
import { AuthSessionService } from './services/auth-session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderMobileComponent,
    UserProfileMenuComponent,
    AsyncPipe,
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
  isHeaderHidden = false;
  private readonly headerHiddenRoutes = ['/login', '/cadastro', '/area-do-usuario'];

  constructor(
    private router: Router,
    public authSession: AuthSessionService
  ) {
    this.isHeaderHidden = this.shouldHideHeader(this.router.url);

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.isHeaderHidden = this.shouldHideHeader((event as NavigationEnd).urlAfterRedirects);
    });
  }

  private shouldHideHeader(url: string): boolean {
    return this.headerHiddenRoutes.some((route) => url.startsWith(route));
  }
}
