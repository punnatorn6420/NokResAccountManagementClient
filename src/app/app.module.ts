import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Aura from '@primeng/themes/aura';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { AppShellComponent } from './app-shell.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';
import { MarkdownModule } from 'ngx-markdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
// import { AuthService } from './service/auth.service';

// function loadProfileInitializer(): Promise<void> {
//   const auth = inject(AuthService);
//   if (location.pathname.includes('/redirect')) {
//     const t = new URLSearchParams(location.search).get('token');
//     if (t) sessionStorage.setItem('bearerToken', t);
//     return Promise.resolve();
//   }
//   return auth.loadProfile();
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppShellComponent,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    // provideAppInitializer(loadProfileInitializer),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
