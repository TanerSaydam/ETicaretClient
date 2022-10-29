import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/contracts/users/create.user';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(
    private _user: UserService,
    private _alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  get component(){
    return this.registerForm.controls;
  }

  createRegisterForm(){
    this.registerForm = new FormGroup({
      nameSurName: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      userName: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(250)]),
      password: new FormControl("", [Validators.required]),
      passwordConfirm: new FormControl("", [Validators.required])
    }, {validators: (group: AbstractControl): ValidationErrors | null => {
      let password = group.get("password").value;
      let passwordConfirm = group.get("passwordConfirm").value;
      return password === passwordConfirm ? null : { notSame: true }      
    }});
  }

  async register(){    
    if (!this.registerForm.valid) 
      return;
    
    const result: CreateUser =  await this._user.create(this.registerForm.value);
    if(result.succeeded)
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
    if (this.registerForm.controls[name].touched) {
      if (this.registerForm.controls[name].valid)
        return "form-control is-valid"
      else
        return "form-control is-invalid"
    }

    return "form-control"      
  }

}
