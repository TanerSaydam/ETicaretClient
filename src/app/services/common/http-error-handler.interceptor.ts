import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { AlertifyService, MessageType, Position } from '../admin/alertify.service';
import { UserService } from './models/user.service';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private _alertify: AlertifyService,
    private _user: UserService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err)=> {
      console.log(err);
      
      switch(err.status){
        case HttpStatusCode.Unauthorized:
          this._user.refreshTokenLogin(localStorage.getItem("refreshToken"), (res)=> {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
          })
          this._alertify.message("Yetkisiz kullanıcı girişi!", {
            dismissOthers: true,
            position: Position.TopRight,
            messageType: MessageType.Error
          })
        break;
        case HttpStatusCode.InternalServerError:
          this._alertify.message(err.error, {
            dismissOthers: true,
            position: Position.TopRight,
            messageType: MessageType.Error
          })
        break;
        case HttpStatusCode.BadRequest:
          
        break;
        case HttpStatusCode.NotFound:
          
        break;
        default:
          this._alertify.message("Sunucuya ulaşılamıyor!", {
            dismissOthers: true,
            position: Position.TopRight,
            messageType: MessageType.Error
          })
        break;
      }
      
      return of(err)
    }));
  }
}
