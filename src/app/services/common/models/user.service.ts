import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/create.user';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _client: HttpClientService,
    private _alertify: AlertifyService
  ) { }

  async create(user: User): Promise<CreateUser>{
    const observable: Observable<CreateUser | User> = this._client.post<CreateUser | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(user: User, callBack?: ()=> void): Promise<any>{
    const observable: Observable<any> = this._client.post<any>({
      controller: "users",
      action: "login"
    }, user);
    var token = await firstValueFrom(observable) as any;    
    if(token){
      localStorage.setItem("accessToken", token.accessToken);      
      this._alertify.message("Kullanıcı girişi başarılı",{
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Success
      })
    }

    return callBack();
  }

  async googleLogin(model: any, callBack?: ()=> void): Promise<any>{
    const observable: Observable<any> = this._client.post<any>({
      controller: "users",
      action: "GoogleLogin"
    }, model);
    var token = await firstValueFrom(observable) as any;    
    if(token){
      localStorage.setItem("accessToken", token.accessToken);      
      this._alertify.message("Kullanıcı girişi başarılı",{
        dismissOthers: true,
        position: Position.TopRight,
        messageType: MessageType.Success
      })
    }

    return callBack();
  }
}
