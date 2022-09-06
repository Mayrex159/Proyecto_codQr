import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlumnoPage } from '../alumno/alumno.page';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  //Se crea variable para verificar correo
  verEmail: string;

  constructor(private usuarioService: UsuarioService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  //Método para recuperar contraseña
  validarEmail() {
    var usuarioEmail = this.usuarioService.validarEmail(this.verEmail)
    if (usuarioEmail != undefined) {
      alert
      this.router.navigate(['/login']);
    } else {
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Campo email no debe estar vacio!',
      duration: 3000
    });
    toast.present();
  }

}
