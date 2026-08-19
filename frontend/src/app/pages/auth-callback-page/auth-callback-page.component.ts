import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
  selector: 'app-auth-callback-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './auth-callback-page.component.html',
  styleUrls: ['./auth-callback-page.component.css']
})
export class AuthCallbackPageComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  mensagem = 'Confirmando seu e-mail...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authSession: AuthSessionService
  ) {}

  async ngOnInit(): Promise<void> {
    const queryParams = this.route.snapshot.queryParamMap;
    const accessToken = queryParams.get('access_token');
    const refreshToken = queryParams.get('refresh_token');
    const type = queryParams.get('type');

    if (!accessToken || !refreshToken) {
      this.status = 'error';
      this.mensagem = 'Não foi possível validar o link de confirmação. Solicite um novo envio.';
      return;
    }

    if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
      this.status = 'error';
      this.mensagem = 'Configuração do Supabase ausente. Verifique as variáveis do ambiente.';
      return;
    }

    try {
      const headers = new HttpHeaders({
        apikey: environment.supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`
      });

      await firstValueFrom(
        this.http.get(`${environment.supabaseUrl}/auth/v1/user`, {
          headers
        })
      );

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      await this.authSession.loadSession();

      this.status = 'success';
      this.mensagem =
        type === 'signup'
          ? 'E-mail confirmado com sucesso! Agora você já pode acessar sua conta.'
          : 'Sessão confirmada com sucesso!';
    } catch (error) {
      this.status = 'error';
      this.mensagem = 'Não foi possível concluir a confirmação. Tente novamente mais tarde.';
    }
  }
}
