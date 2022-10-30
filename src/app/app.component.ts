import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public _auth: AuthService,
    private _router: Router         
  ){
    _auth.identityCheck();
  }

  signOut(){
   localStorage.removeItem("accessToken");   
   this._router.navigateByUrl("/");
   this._auth.identityCheck();
  }
}
