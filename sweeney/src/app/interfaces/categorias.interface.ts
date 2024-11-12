export interface categoria{
    ID: number,
    nombre: string,
    presupuesto: number,
    id_user: number,
    estatus:number,
    estatusDetail:{
        estatus: string
    }
}