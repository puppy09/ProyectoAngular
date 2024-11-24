export interface gruposCreados {
    id_grupo: number;
    nombre: string;
    descripcion: string;
    id_creador: number;
    fondos: number;
    token: string;
}

export interface gruposMiembro{
    id_grupo: number;
    id_usuario: number;
    id_estatus: number;
    grupoDetail:{
        nombre: string,
        descripcion: string,
        fondos: number
    }
    creadorDetail:{
        ID: number,
        nombre: string
    }
}