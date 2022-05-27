import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged=false;
  isLoginFail=false;
  LoginUsuario:LoginUsuario;
  nombreUsuario:string;
  passwords:string;
  roles:string[]=[];
  erMsj:string;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
   
  }
  onLogin():void{
    this.LoginUsuario=new LoginUsuario(this.nombreUsuario,this.passwords);
    this.authService.login(this.LoginUsuario).subscribe(
      data=>{
        this.isLogged=true;
   

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.toastr.success('Bienvenido'+data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/']);
      },
      err=>{
        this.isLogged=false;
        this.erMsj=err.error.message;
       // console.log(err.error.message);
       this.toastr.error(this.erMsj, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
        
      }
    );
  }

}
