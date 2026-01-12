import { Component } from '@angular/core';
import { HeaderAutenticadoComponent } from '../../components/header-autenticado/header-autenticado.component';

@Component({
  selector: 'app-user-area-page',
  standalone: true,
  imports: [HeaderAutenticadoComponent],
  templateUrl: './user-area-page.component.html',
  styleUrls: ['./user-area-page.component.css']
})
export class UserAreaPageComponent {}
