export class Entidad {
    constructor(public id: number,
                public nombre: string,
                public direccion: string,
                public telefono: string,
                public nit: string,
                public contactonombre:string,
                public contactocargo: string,
                public contactotelefono:string,
                public contactoemail: string,
                public licencia: string,
                public orden: string,
                public usuarios: string,
                public sesionesconcurrentes: string,
                public tributos: string,
                public funciones:string,
                public stado: string,
                public idmunicipio: number,
                public idedepartamento: number,
                public idpais: number
                
                ) { }
}