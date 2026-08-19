import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthSessionService } from '../../services/auth-session.service';

type ProfileViewModel = {
  isAuthenticated: boolean;
  avatarUrl: string | null;
  displayName: string;
  email: string | null;
};

@Component({
  selector: 'app-user-profile-menu',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.css']
})
export class UserProfileMenuComponent {
  private authSession = inject(AuthSessionService);
  private router = inject(Router);

  readonly viewModel$ = combineLatest({
    isAuthenticated: this.authSession.isAuthenticated$,
    user: this.authSession.user$,
    profile: this.authSession.profile$
  }).pipe(
    map(({ isAuthenticated, user, profile }) => {
      const displayName = profile?.nome?.toString().trim() || user?.email || 'Usuário';
      return {
        isAuthenticated,
        avatarUrl: this.resolveAvatarUrl(profile?.foto_perfil ?? null),
        displayName,
        email: user?.email ?? null
      } satisfies ProfileViewModel;
    })
  );

  async handleLogout(): Promise<void> {
    await this.authSession.logout();
    await this.router.navigate(['/home']);
  }

  async goToEditProfile(): Promise<void> {
    await this.router.navigate(['/perfil/editar']);
  }

  private resolveAvatarUrl(avatar: string | null): string | null {
    if (!avatar) {
      return null;
    }

    if (avatar.startsWith('data:image')) {
      return avatar;
    }

    if (avatar.startsWith('http')) {
      return avatar;
    }

    return `data:image/png;base64,${avatar}`;
  }
}
