export interface categoriaGrupal{
    id_categoria: number,
    id_grupo: number,
    categoria: string,
    id_creador: number,
    presupuesto: number,
    estatus: number,
    estatusDetail: {
        estatus: string
    },
    creadorDetail: {
        nombre: string
    }
}