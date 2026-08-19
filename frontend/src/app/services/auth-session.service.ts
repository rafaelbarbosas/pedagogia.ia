import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

type AuthUser = {
  id?: string;
  email?: string;
  [key: string]: unknown;
};

type AuthProfile = {
  nome?: string | null;
  foto_perfil?: string | null;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(null);
  private readonly profileSubject = new BehaviorSubject<AuthProfile | null>(null);
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private loadingPromise: Promise<void> | null = null;

  readonly user$ = this.userSubject.asObservable();
  readonly profile$ = this.profileSubject.asObservable();
  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    void this.loadSession();
  }

  async loadSession(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.fetchSession();
    await this.loadingPromise;
  }

  async logout(): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.clearSession();
      return;
    }

    try {
      await firstValueFrom(
        this.http.post(
          `https://${environment.urlApi}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
      );
    } catch (error) {
      // Ignora erros de logout remoto para limpar sessão local mesmo assim.
    } finally {
      localStorage.removeItem('access_token');
      this.clearSession();
    }
  }

  private async fetchSession(): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.clearSession();
      return;
    }

    try {
      const response = await firstValueFrom(
        this.http.get(`https://${environment.urlApi}/auth/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      );
      const { user, profile } = response as { user?: AuthUser; profile?: AuthProfile | null };
      if (user) {
        this.userSubject.next(user);
        this.profileSubject.next(profile ?? null);
        this.isAuthenticatedSubject.next(true);
        return;
      }
    } catch (error) {
      // Falha ao validar sessão, limpar dados locais.
    }

    this.clearSession();
  }

  private clearSession(): void {
    this.userSubject.next(null);
    this.profileSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
