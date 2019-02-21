import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { DirectivesModule } from '../../theme/directives/directives.module'
import { AngularFontAwesomeModule } from 'angular-font-awesome';





import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  VkontakteLoginProvider,
} from "angular-6-social-login-v2";

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("938990935440-isfmhu1s5mii7g8q893ihvu9broo1h8o.apps.googleusercontent.com")
        },
        {
          id: VkontakteLoginProvider.PROVIDER_ID,
          provider: new VkontakteLoginProvider("Your-VK-Client-Id")
        },        
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
          },
      ]
  );
  return config;
}





@NgModule({
  
  imports: [
    SocialLoginModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    DirectivesModule,
    AngularFontAwesomeModule,

   
  ],
  declarations: [
    LoginComponent

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class LoginModule { }