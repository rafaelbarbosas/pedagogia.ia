import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

import { IaService } from '../../service/ia.service';

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css']
})
export class GeneratorPageComponent {
  promptUsuario =
    'Crie uma atividade lúdica sobre cores, incluindo objetivo, materiais e passo a passo para a turma.';
  respostaIA = '';
  carregando = false;
  serieSelecionada = '';
  seriesDisponiveis = ['Jardim 1', 'Jardim 2', '1º ano'];

  constructor(
    private iaService: IaService,
    private sanitizer: DomSanitizer
  ) {}

  async gerar() {
    if (!this.serieSelecionada) {
      return;
    }

    this.carregando = true;
    this.respostaIA = '';
    const promptComSerie = `Série alvo: ${this.serieSelecionada}\n\n${this.promptUsuario}`;

    try {
      this.respostaIA = await this.iaService.gerarExercicio(promptComSerie);
    } catch (err) {
      this.respostaIA = 'Erro ao gerar exercício. Tente novamente.';
    } finally {
      this.carregando = false;
    }
  }

  get textoFormatado(): SafeHtml {
    const html = marked.parse(this.respostaIA || '', { async: false }) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
