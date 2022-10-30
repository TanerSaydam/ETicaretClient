import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandlerInterceptor } from './services/common/http-error-handler.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=> localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7109"]
      }
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: "baseUrl", 
      useValue: "https://localhost:7109/api",
      multi: true
    },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        authLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("893161204353-nsv7ccqqcd386kt845ideqniarvdjrb5.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)        
      } as SocialAuthServiceConfig
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
