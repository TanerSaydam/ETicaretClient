import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  get component(){
    return this.registerForm.controls;
  }

  createRegisterForm(){
    this.registerForm = new FormGroup({
      adSoyad: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      kullaniciAdi: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(250)]),
      sifre: new FormControl("", [Validators.required]),
      sifreTekrar: new FormControl("", [Validators.required])
    }, {validators: (group: AbstractControl): ValidationErrors | null => {
      let password = group.get("sifre").value;
      let confirmPassword = group.get("sifreTekrar").value;
      return password === confirmPassword ? null : { notSame: true }      
    }});
  }

  register(){
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      
      return;
    }
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
