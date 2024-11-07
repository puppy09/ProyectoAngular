export interface MovProgramados {
    id_movimientoProgramado: number;
    id_usuario: number;
    no_cuenta: string;
    descripcion: string;
    monto: number;
    dia: number;
    estatusDetail:{
        estatus:string;
    }
}
