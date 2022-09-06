import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //VARIABLES NECESARIAS PARA EL CRUD:
  static user_login: any

  usuarios: any[] = [
    {
      rut: '18.832.931-4',
      email: 'cynthia@duocuc.cl',
      nom_completo: 'Cynthia',
      fecha_nac: '1994-09-06',
      semestre: 4,
      password: 'asd123',
      tipo_usuario: 'alumno'
    },
    {
      rut: '20.987.310-9',
      email: 'mabel@duocuc.cl',
      nom_completo: 'Mabel',
      fecha_nac: '1994-09-06',
      semestre: 3,
      password: 'asd123',
      tipo_usuario: 'alumno'
    },
    {
      rut: '18.936.605-1',
      email: 'maycoll@duoc.cl',
      nom_completo: 'Maycoll',
      fecha_nac: '1994-09-06',
      semestre: null,
      password: 'asd123',
      tipo_usuario: 'administrador'
    },
    {
      rut: '23.348.162-3',
      email: 'sofia@profesor.duoc.cl',
      nom_completo: 'Sofía',
      fecha_nac: '1994-09-06',
      semestre: null,
      password: 'asd123',
      tipo_usuario: 'profesor'
    },
    {
      rut: '19.644.623-0',
      email: 'camila@profesor.duoc.cl',
      nom_completo: 'Camila',
      fecha_nac: '1994-09-06',
      semestre: null,
      password: 'asd123',
      tipo_usuario: 'profesor'
    }

  ];

  constructor() { }

  //MÉTODOS DEL CRUD:
  //AGREGAR
  agregarUsuario(usuario): boolean {
    if (this.obtenerUsuario(usuario.rut) == undefined) {

      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  //ELIMINAR
  eliminarUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      console.log(usu)
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      } else if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    }
    )
  };

  //MODIFICAR
  modificarUsuario(usuario) {
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }


  obtenerUsuario(rut) {
    return this.usuarios.find(usuario => usuario.rut == rut);

  }


  //
  obtenerUsuarios() {
    return this.usuarios;
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y pass, me entrega un JSON de un usuario
  validarEmailPassword(email, pass) {
    var usuario_login = this.usuarios.find(u => u.email == email && u.password == pass);
    UsuarioService.user_login = usuario_login.nom_completo;
    return usuario_login;
  }

  //Validar email
  validarEmail(email) {
    return this.usuarios.find(u => u.email == email);
  }


  obtenerAlumno(tipo_usuario) {
    return this.usuarios.filter(us => us.tipo_usuario == 'alumno');

  }

  obtenerProfesor(tipo_usuario) {
    return this.usuarios.filter(us => us.tipo_usuario == 'profesor');
    ;

  }
  obtenerAdmin(tipo_usuario) {
    return this.usuarios.filter(us => us.tipo_usuario == 'administrador');
    ;

  }


}









