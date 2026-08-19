import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  template: `
    <a
      mat-raised-button
      color="primary"
      class="auth-button auth-button--login"
      [routerLink]="link"
      [attr.aria-label]="ariaLabel || label"
    >
      {{ label }}
    </a>
  `,
  styleUrls: ['./auth-login-button.component.css']
})
export class AuthLoginButtonComponent {
  @Input() link = '/login';
  @Input() label = 'Fazer login';
  @Input() ariaLabel = '';
}
