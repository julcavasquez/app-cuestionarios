import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { LoginForm } from './pages/login/login-form/login-form';
import { Home } from './pages/home/home';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { UsuarioService } from './services/usuario';
import { adminGuard } from './services/admin.guard';
import { noAuthGuard } from './services/no-auth.guard';
import { estudainteGuard } from './services/estudiante.guard';
import { PublicLayout } from './layouts/public-layout';
import { AdminLayout } from './layouts/admin-layout';
import { Usuarios } from './pages/usuarios/usuarios';
import { Temas } from './pages/temas/temas';
import { Cuestionarios } from './pages/cuestionarios/cuestionarios';
import { PreguntasForm } from './pages/preguntas-form/preguntas-form';
import { ViewPreguntas } from './pages/preguntas-form/view-preguntas/view-preguntas';
import { Panel } from './pages/panel/panel';
import { ExamenRapido } from './pages/panel/examen-rapido/examen-rapido';
import { TriviaDia } from './pages/panel/trivia-dia/trivia-dia';
import { PagoPlan } from './pages/pago-plan/pago-plan';
import { DetalleCompetencias } from './pages/temas/detalle-competencias/detalle-competencias';
export const routes: Routes = [
   {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'home', component: Home },
      { path: 'register', component: Register,canActivate: [noAuthGuard] },
      { path: 'login', component: LoginForm,canActivate: [noAuthGuard] },
      { path: 'planes/pago/:id', component: PagoPlan,canActivate: [noAuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'usuarios', component: Usuarios },
      { path: 'temas', component: Temas },
      { path: 'cuestionarios', component: Cuestionarios },
      { path: 'preguntas/:id', component: ViewPreguntas },
      { path: 'detallecompe/:id', component: DetalleCompetencias },
      { path: 'preguntas', component: PreguntasForm },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'estudiante',
    component: PublicLayout,
    canActivate: [estudainteGuard],
    children: [
      { path: 'panel', component: Panel },
      { path: 'examen-rapido', component: ExamenRapido },
      { path: 'trivia-dia', component: TriviaDia },
      { path: 'planes/pago/:id', component: PagoPlan },
      { path: '', redirectTo: 'panel', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'inicio' }
  
];

