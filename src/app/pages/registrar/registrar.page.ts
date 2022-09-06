import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  //SE CREA GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duoc|duocuc|profesor.duoc)\.([c]{1}[l]{1})')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });

  //SE CREA UNA VARIABLE PARA VERIFICAR LA PASSWORD
  verificar_password: string;


  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  //MÉTODO DEL FORMULARIO
  registrar() {
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    this.usuarioService.agregarUsuario(this.alumno.value)
    alert('ALUMNO REGISTRADO!');
    this.router.navigate(['/login']);
  }



}
