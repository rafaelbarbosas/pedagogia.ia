import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfileMenuComponent } from '../user-profile-menu/user-profile-menu.component';

@Component({
  selector: 'app-header-autenticado-mobile',
  standalone: true,
  imports: [RouterLink, UserProfileMenuComponent],
  templateUrl: './header-autenticado-mobile.component.html',
  styleUrls: ['./header-autenticado-mobile.component.css']
})
export class HeaderAutenticadoMobileComponent {}
