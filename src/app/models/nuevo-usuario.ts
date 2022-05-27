export class NuevoUsuario {
    dni:number;
    nombreUsuario:string;
    lastname:string;
    email:string;
    phone:number;
    jobid:number;
    passwords:string;
  //  authorities:string[];
    constructor(dni:number, nombreUsuario:string, lastname:string,email:string,phone:number,jobid:number, passwords:string) {
 this.dni=dni;
 this.nombreUsuario=nombreUsuario;
  this.lastname=lastname;
  this.email=email;
  this.phone=phone;
  this.jobid=jobid;
  this.passwords=passwords;
    }
}
