export interface subcategoriaGrupal{
    id_subcategoria: number,
    id_grupo: number,
    id_categoria: number,
    id_negocio: number,
    id_creador: number,
    categoriagrupal: {
        categoria: string
    },
    negocio: {
        nombre: string
    }
}