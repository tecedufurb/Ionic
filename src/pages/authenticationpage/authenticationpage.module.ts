import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationpagePage } from './authenticationpage';

@NgModule({
  declarations: [
    AuthenticationpagePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationpagePage),
  ],
})
export class AuthenticationpagePageModule {}
