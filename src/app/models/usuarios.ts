export class Usuario{
    public id?: number;
    constructor(
        
        public tipoidentificacion: string,
        public identificacion: string,
        public primernombre: string,
        public segundonombre: string,
        public primerapellido: string,
        public segundoapellido: string,
        public razonsocial: string,
        public sexo: string,
        public fechanacimiento: Date,
        public direccion: string,
        public telefono: string,
        public celular: string,
        public email: string,
        public usuario: string,
        public clave: string,
        public tipousuario: string,
        public esadministrador: boolean,
        public nombrecompleto: string,
        public ultimaconexion: string,
        public ultimageoposicion: string,
        public ultimaip: string,
        public ultimoso: string,
        public ultimonavegador: string,
        public ultimasesion: string,
        public accesomultiple: boolean,
        public codigoreinicio: string,
        public fechahorareinicio: string,
        public fechacreacion: string,
        public tipocontribuyente: string,
        public estado: string,
        public idmunicipio: number,
        public urlimagen: string

    ){}

}
