import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  template: `
    <a
      mat-stroked-button
      color="primary"
      class="auth-button auth-button--signup"
      [routerLink]="link"
      [attr.aria-label]="ariaLabel || label"
    >
      {{ label }}
    </a>
  `,
  styleUrls: ['./auth-signup-button.component.css']
})
export class AuthSignupButtonComponent {
  @Input() link = '/cadastro';
  @Input() label = 'Criar conta';
  @Input() ariaLabel = '';
}
