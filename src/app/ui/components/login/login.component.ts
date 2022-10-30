import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  unSubscribe = new Subject<void>;
  loginForm: FormGroup;
  constructor(
    private _user: UserService,
    private _alertify: AlertifyService,
    private _auth: AuthService,
    private _activated: ActivatedRoute,
    private _router: Router,
    private _social: SocialAuthService,
    private _http: HttpClient
  ) { 
    this._social.authState.subscribe({
      next: (user: SocialUser)=> {
        console.log(user);
        let api = "https://localhost:7109/api/Auth/GoogleLogin"
        this._http.post<any>(api, user).pipe(
          takeUntil(this.unSubscribe)
        ).subscribe({
          next: (res)=> {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            this._auth.identityCheck();
            this._router.navigate(["/admin"])
            this.unSubscribe.next();
            this.unSubscribe.complete();
          }
        })
        //this.googleLogin(user);
      }
    })
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({      
      usernameOrEmail: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),    
      password: new FormControl("", [Validators.required])
      });
  }

  async login(){    
    if (!this.loginForm.valid) 
      return;
    
    const result =  await this._user.login(this.loginForm.value, ()=> {
      this._auth.identityCheck();
      this._activated.queryParams.subscribe({
        next: (res)=> {
          const returnUrl = res["returnUrl"];
          if(returnUrl)
            this._router.navigateByUrl(returnUrl)
        }
      })
    });
    if(result?.succeeded)
      this._alertify.message(result.message, {
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Success
      });
    else
      this._alertify.message(result.message, {
        dismissOthers:true,
        position: Position.TopRight,
        messageType: MessageType.Error
      });
  }  

  changeInputClassToValidStatus(name: string){   
    if (this.loginForm.controls[name].touched) {
      if (this.loginForm.controls[name].valid)
        return "form-control is-valid"
      else
        return "form-control is-invalid"
    }

    return "form-control"      
  }
}
