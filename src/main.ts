import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter,withInMemoryScrolling  } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // vuelve arriba al cambiar de ruta
        anchorScrolling: 'enabled'            // activa scroll a #secciones
      })
    ),
  provideHttpClient()]
}).catch(err => console.error(err));
