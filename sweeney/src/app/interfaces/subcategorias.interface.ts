export interface subcategoria{
    id_subcategory: number,
    id_category: number,
    id_negocio: number,
    id_user: number,
    category:{
        nombre: string
    },
    negocio:{
        nombre: string
    }
}