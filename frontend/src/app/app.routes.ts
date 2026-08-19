import { Routes } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HowToUsePageComponent } from './pages/how-to-use-page/how-to-use-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterThankYouPageComponent } from './pages/register-thank-you-page/register-thank-you-page.component';
import { UserAreaPageComponent } from './pages/user-area-page/user-area-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'gerar-atividades' },
  { path: 'home', component: HomePageComponent },
  { path: 'como-utilizar', component: HowToUsePageComponent },
  { path: 'sobre-nos', component: AboutPageComponent },
  { path: 'contato', component: ContactPageComponent },
  { path: 'gerar-atividades', component: GeneratorPageComponent },
  { path: 'auth/callback', component: AuthCallbackPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'area-do-usuario', component: UserAreaPageComponent },
  { path: 'cadastro', component: RegisterPageComponent },
  { path: 'cadastro/obrigado', component: RegisterThankYouPageComponent }
];
