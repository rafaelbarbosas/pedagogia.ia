import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = '';
  senha = '';
  loginErro = '';
  carregando = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async submitLogin(): Promise<void> {
    if (this.carregando) {
      return;
    }

    this.loginErro = '';
    this.carregando = true;

    try {
      const response = await firstValueFrom(
        this.http.post(`https://${environment.urlApi}/auth/login`, {
          email: this.email,
          senha: this.senha
        })
      );
      const { access_token: accessToken } = response as { access_token?: string };
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
      }
      await this.router.navigate(['/area-do-usuario']);
    } catch (error) {
      this.loginErro = 'Não foi possível fazer login. Verifique seus dados e tente novamente.';
    } finally {
      this.carregando = false;
    }
  }
}
