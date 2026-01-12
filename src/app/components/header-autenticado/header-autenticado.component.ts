import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HeaderAutenticadoMobileComponent } from '../header-autenticado-mobile/header-autenticado-mobile.component';

@Component({
  selector: 'app-header-autenticado',
  standalone: true,
  imports: [HeaderAutenticadoMobileComponent, MatToolbarModule, RouterLink],
  templateUrl: './header-autenticado.component.html',
  styleUrls: ['./header-autenticado.component.css']
})
export class HeaderAutenticadoComponent {}
