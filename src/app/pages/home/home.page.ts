import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validate, clean, format, getCheckDigit } from 'rut.js'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  //VAMOS A CREAR EL GRUPO DEL FORMULARIO:
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duocuc)+(?:(\\.cl))$')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^((?!\s{2,}).)*$/)]),
    fecha_nac: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^((?!\s{2,}).)*$/)]),
    tipo_usuario: new FormControl('alumno', [Validators.required])
  });
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(duoc|duocuc|profesor.duoc)+(?:(\\.cl))$')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^((?!\s{2,}).)*$/)]),
    fecha_nac: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^((?!\s{2,}).)*$/)]),
    tipo_usuario: new FormControl('profesor', [Validators.required])
  });

  //CREAR VARIABLES LOCALES
  usuarios: any[] = [];
  alumnos: any[] = [];
  profesores: any[] = [];
  administradores: any[] = [];
  verificar_password: string;
  userLogin: any = UsuarioService.user_login;
  permiso: boolean;
  formulario: boolean = false;
  forReg: boolean = false;
  rut: string;

  rutValidator: boolean;
  adm: boolean = false;
  alu: boolean = false;
  prof: boolean = false;


  constructor(private usuarioService: UsuarioService, private alertController: AlertController) {

  }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.obtenerUsuarios();
    this.alumnos = this.usuarioService.obtenerAlumno('alumno');
    this.profesores = this.usuarioService.obtenerProfesor('profesor');
    this.administradores = this.usuarioService.obtenerAdmin('administrador');

    if (this.usuarioService.obtenerUsuario) {
      this.permiso = true;

    }

  }


  //método del formulario
  registrar() {
    var rutValidator = validate(this.alumno.value.rut);
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }

    var registrado: boolean = this.usuarioService.agregarUsuario(this.usuario.value);
    if (!registrado) {
      alert('USUARIO YA EXISTE!');
      return;
    } else if (rutValidator == false) {
      alert('RUT INVALIDO')
      return;
    } else if (this.calcularEdadRetorno() == false) {
      alert('Debe ser mayor de 16 años!');
      return;
    }
    alert('ALUMNO REGISTRADO!');
    this.alumnos = this.usuarioService.obtenerAlumno('alumno');
    this.usuario.reset();
    this.verificar_password = '';
  }


  eliminar(rutEliminar) {
    console.log(rutEliminar)
    this.usuarioService.eliminarUsuario(rutEliminar);
    this.alumnos = this.usuarioService.obtenerAlumno('alumno');
    this.profesores = this.usuarioService.obtenerProfesor('profesor');
    this.administradores = this.usuarioService.obtenerAdmin('administrador');
  }

  buscar(rutBuscar) {
    this.formulario = true;
    this.forReg = false;
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
    document.getElementById('rut').setAttribute('disabled', 'true');
    document.getElementById('modificar').setAttribute('disabled', 'false');

  }

  modificar() {
    if (this.formulario = false) {
    }
    this.usuarioService.modificarUsuario(this.alumno.value);
    this.formulario = true
    alert('Modificado con exito!')
    this.alumnos = this.usuarioService.obtenerAlumno('alumno');
    this.profesores = this.usuarioService.obtenerProfesor('profesor');
    this.administradores = this.usuarioService.obtenerAdmin('administrador');
    return;
  }

  limpiar() {
    this.alumno.reset();
    this.verificar_password = '';
  }

//listar alumnos
listarAlumno() {
  this.limpiar()
  var alumEnc = this.usuarioService.obtenerAlumno('alumno');
  this.alu = true;
  this.prof = false;
  this.adm = false;
  this.forReg = false;
  this.formulario = false;
  console.log(alumEnc);
}

//listar Prfesor
listarProfesor() {
  this.limpiar()
  var profEnc = this.usuarioService.obtenerProfesor('profesor');
  this.prof = true;
  this.alu = false;
  this.adm = false;
  this.forReg = false;
  this.formulario = false;
  console.log(profEnc);
}

//listarAdministrador
listarAdmin() {
  this.limpiar()
  var admEnc = this.usuarioService.obtenerAdmin('administrador');
  this.adm = true;
  this.prof = false;
  this.alu = false;
  this.forReg = false;
  this.formulario = false;
  console.log(admEnc);
}

  registrarNuevo() {
    this.formulario = false;
    this.forReg = true;
    this.alu = false;
    this.prof = false;
    this.adm = false;
    this.limpiar()
  }



  calcularEdadRetorno() {
    var fn = new Date(this.alumno.value.fecha_nac);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadAlumno = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (edadAlumno >= 17) {
      return true;
    } else {
      alert('Debe ser mayor de 16 años');
      return false;
    }
  }


  async presentAlert(rutEliminar) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {

          }
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
           this.eliminar(rutEliminar) 
          }
        },
      ],
    });

    await alert.present();
  }

  seguroEliminar(){
    this.presentAlert;
  }

}