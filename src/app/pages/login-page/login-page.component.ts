import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
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
  loginSucesso = false;
  carregando = false;

  constructor(private http: HttpClient) {}

  async submitLogin(): Promise<void> {
    if (this.carregando) {
      return;
    }

    this.loginErro = '';
    this.loginSucesso = false;
    this.carregando = true;

    try {
      await firstValueFrom(
        this.http.post(`https://${environment.urlApi}/auth/login`, {
          email: this.email,
          senha: this.senha
        })
      );
      this.loginSucesso = true;
    } catch (error) {
      this.loginErro = 'Não foi possível fazer login. Verifique seus dados e tente novamente.';
    } finally {
      this.carregando = false;
    }
  }
}
