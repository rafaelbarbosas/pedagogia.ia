import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IaService {
  private URL_API = environment.urlApi;

  constructor(private http: HttpClient) {}

  async gerarExercicio(promptUsuario: string): Promise<string> {
    const body = { prompt: promptUsuario };

    const response = await firstValueFrom(
      this.http.post<{ resposta: string }>(`https://${this.URL_API}/gerar`, body)
    );

    return response.resposta;
  }

  async enviarFeedback(payload: {
    prompt: string;
    serie: string;
    resposta: string;
    utilidade: 'util' | 'nao_util';
    comentario?: string;
  }): Promise<void> {
    await firstValueFrom(this.http.post(`https://${this.URL_API}/feedback`, payload));
  }

}
