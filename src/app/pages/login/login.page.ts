import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //CREACIÓN DE VARIABLES NECESARIAS
  email: string;
  password:string;

  constructor(private toastController: ToastController, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  //MÉTODO PARA INGRESAR A HOME:
  login() {
    var usuarioLogin = this.usuarioService.validarEmailPassword(this.email, this.password);
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'administrador') {
        this.router.navigate(['/home']);
      }else if (usuarioLogin.tipo_usuario == 'profesor'){
        this.router.navigate(['/profesor'])
      }else{
        this.router.navigate(['/alumno'])
      }
    } else {
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Credenciales incorrectas!!!',
      duration: 3000
    });
    toast.present();
  }

}
