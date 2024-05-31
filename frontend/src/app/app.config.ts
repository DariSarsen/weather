import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql.provider';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideHttpClient(), graphqlProvider, provideAnimations(), 
    provideToastr({
      positionClass: 'toast-bottom-full-width',
      progressBar: true,
      timeOut: 4000
    }),]
  
  
};
