import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthSessionService } from '../../services/auth-session.service';
import { UserProfileMenuComponent } from '../user-profile-menu/user-profile-menu.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    UserProfileMenuComponent
  ],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent {
  isMenuOpen = false;

  constructor(public authSession: AuthSessionService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
