import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-page',
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
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  endereco = '';
  colegio = '';
  fotoPerfilBase64 = '';
  fotoPerfilNome = '';
  erroCadastro = '';
  carregando = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get senhasCoincidem(): boolean {
    return this.senha === this.confirmarSenha;
  }

  async submitRegister(form: NgForm): Promise<void> {
    if (this.carregando || !form.valid || !this.senhasCoincidem) {
      return;
    }

    this.erroCadastro = '';
    this.carregando = true;

    const endereco = this.endereco.trim();
    const colegio = this.colegio.trim();
    const fotoPerfil = this.fotoPerfilBase64.trim();

    try {
      await firstValueFrom(
        this.http.post(`${environment.urlApi}/auth/register`, {
          email: this.email,
          senha: this.senha,
          nome: this.nome,
          endereco: endereco || null,
          colegio: colegio || null,
          foto_perfil: fotoPerfil || null
        })
      );
      await this.router.navigate(['/cadastro/obrigado']);
    } catch (error) {
      this.erroCadastro = 'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.';
    } finally {
      this.carregando = false;
    }
  }

  async onFotoPerfilSelecionada(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.fotoPerfilBase64 = '';
      this.fotoPerfilNome = '';
      return;
    }

    this.fotoPerfilNome = file.name;

    try {
      this.fotoPerfilBase64 = await this.converterArquivoParaBase64(file);
    } catch (error) {
      this.fotoPerfilBase64 = '';
      this.fotoPerfilNome = '';
      this.erroCadastro = 'Não foi possível carregar a foto de perfil. Tente novamente.';
    }
  }

  private converterArquivoParaBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  }
}
