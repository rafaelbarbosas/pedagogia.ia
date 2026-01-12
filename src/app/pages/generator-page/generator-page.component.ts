import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.css']
})
export class GeneratorPageComponent {
  promptUsuario = '';
  respostaIA = '';
  erroGeracao = '';
  carregando = false;
  serieSelecionada = '';
  seriesDisponiveis = ['Jardim 1', 'Jardim 2', '1º ano'];
  feedbackEscolha: 'util' | 'nao_util' | null = null;
  feedbackComentario = '';
  feedbackEnviando = false;
  feedbackEnviado = false;
  feedbackErro = '';
  feedbackPopoverAberto = false;
  geracaoSucesso = false;

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
    this.erroGeracao = '';
    this.geracaoSucesso = false;
    this.resetarFeedback();
    const promptComSerie = `Série alvo: ${this.serieSelecionada}\n\n${this.promptUsuario}`;

    try {
      this.respostaIA = await this.iaService.gerarExercicio(promptComSerie);
      this.geracaoSucesso = true;
      this.feedbackPopoverAberto = true;
    } catch (err) {
      this.erroGeracao = 'Erro ao gerar exercício. Tente novamente.';
    } finally {
      this.carregando = false;
    }
  }

  get textoFormatado(): SafeHtml {
    const html = marked.parse(this.respostaIA || '', { async: false }) as string;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  exportarTxt() {
    const conteudo = this.montarConteudoExportacao();
    if (!conteudo) {
      return;
    }

    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    this.baixarArquivo(blob, this.gerarNomeArquivo('txt'));
  }

  exportarPdf() {
    const conteudo = this.montarConteudoExportacao();
    if (!conteudo) {
      return;
    }

    const pdfBlob = this.gerarPdf(conteudo);
    this.baixarArquivo(pdfBlob, this.gerarNomeArquivo('pdf'));
  }

  selecionarFeedback(tipo: 'util' | 'nao_util') {
    this.feedbackEscolha = tipo;
    this.feedbackErro = '';
  }

  async enviarFeedback() {
    if (!this.feedbackEscolha || !this.respostaIA) {
      return;
    }

    this.feedbackEnviando = true;
    this.feedbackErro = '';

    try {
      await this.iaService.enviarFeedback({
        prompt: this.promptUsuario,
        serie: this.serieSelecionada,
        resposta: this.respostaIA,
        utilidade: this.feedbackEscolha,
        comentario: this.feedbackComentario.trim() || undefined
      });
      this.feedbackEnviado = true;
    } catch (err) {
      this.feedbackErro = 'Não foi possível enviar o feedback. Tente novamente.';
    } finally {
      this.feedbackEnviando = false;
    }
  }

  private resetarFeedback() {
    this.feedbackEscolha = null;
    this.feedbackComentario = '';
    this.feedbackEnviando = false;
    this.feedbackEnviado = false;
    this.feedbackErro = '';
  }

  fecharFeedbackPopover() {
    this.feedbackPopoverAberto = false;
  }

  private montarConteudoExportacao(): string {
    if (!this.respostaIA) {
      return '';
    }

    const partes = [];
    if (this.serieSelecionada) {
      partes.push(`Série alvo: ${this.serieSelecionada}`);
    }
    if (this.promptUsuario) {
      partes.push(`Descrição informada: ${this.promptUsuario}`);
    }
    partes.push(`Atividade gerada:\n${this.respostaIA.trim()}`);

    return partes.join('\n\n');
  }

  private gerarNomeArquivo(extensao: string): string {
    const data = new Date().toISOString().slice(0, 10);
    return `atividade-${data}.${extensao}`;
  }

  private baixarArquivo(blob: Blob, nomeArquivo: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }

  private gerarPdf(conteudo: string): Blob {
    const linhas = this.quebrarLinhas(conteudo, 90);
    const linhasPorPagina = 40;
    const paginas: string[][] = [];
    for (let i = 0; i < linhas.length; i += linhasPorPagina) {
      paginas.push(linhas.slice(i, i + linhasPorPagina));
    }

    const objetos: string[] = [];
    objetos.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    objetos.push(
      `2 0 obj\n<< /Type /Pages /Kids [${paginas
        .map((_, idx) => `${4 + idx * 2} 0 R`)
        .join(' ')}] /Count ${paginas.length} >>\nendobj\n`
    );
    objetos.push('3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

    paginas.forEach((pagina, index) => {
      const pageObjNum = 4 + index * 2;
      const contentObjNum = 5 + index * 2;
      objetos.push(
        `${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjNum} 0 R >>\nendobj\n`
      );

      const stream = this.montarStreamPdf(pagina);
      const length = new TextEncoder().encode(stream).length;
      objetos.push(`${contentObjNum} 0 obj\n<< /Length ${length} >>\nstream\n${stream}\nendstream\nendobj\n`);
    });

    let pdf = '%PDF-1.4\n';
    const offsets: number[] = [0];
    const encoder = new TextEncoder();

    objetos.forEach((obj) => {
      offsets.push(encoder.encode(pdf).length);
      pdf += obj;
    });

    const xrefOffset = encoder.encode(pdf).length;
    pdf += `xref\n0 ${offsets.length}\n`;
    pdf += '0000000000 65535 f \n';
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const bytes = encoder.encode(pdf);
    return new Blob([bytes], { type: 'application/pdf' });
  }

  private montarStreamPdf(linhas: string[]): string {
    const startX = 72;
    const startY = 720;
    const lineHeight = 16;
    const linhasEscapadas = linhas.map((linha) => this.escaparTextoPdf(linha));

    let stream = 'BT\n/F1 12 Tf\n';
    if (linhasEscapadas.length > 0) {
      stream += `${startX} ${startY} Td\n(${linhasEscapadas[0]}) Tj\n`;
      for (let i = 1; i < linhasEscapadas.length; i += 1) {
        stream += `0 -${lineHeight} Td\n(${linhasEscapadas[i]}) Tj\n`;
      }
    }
    stream += 'ET';
    return stream;
  }

  private escaparTextoPdf(texto: string): string {
    return texto.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  private quebrarLinhas(texto: string, maxCaracteres: number): string[] {
    const linhas: string[] = [];
    texto.split(/\r?\n/).forEach((linha) => {
      if (!linha) {
        linhas.push('');
        return;
      }

      let atual = linha;
      while (atual.length > maxCaracteres) {
        let corte = atual.lastIndexOf(' ', maxCaracteres);
        if (corte === -1) {
          corte = maxCaracteres;
        }
        linhas.push(atual.slice(0, corte));
        atual = atual.slice(corte).trimStart();
      }
      linhas.push(atual);
    });

    return linhas;
  }
}
