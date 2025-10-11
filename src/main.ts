import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter,withInMemoryScrolling  } from '@angular/router';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth-interceptor';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // vuelve arriba al cambiar de ruta
        anchorScrolling: 'enabled'            // activa scroll a #secciones
      })
    ),
  provideHttpClient(withInterceptors([authInterceptor]))]
}).catch(err => console.error(err));
