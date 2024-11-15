
export interface Pagos{
    id_pago: number;
    id_usuario: number;
    no_cuenta: string;
    descripcion: string;
    monto: number;
    categoria: number;
    subcategoria: number;
    tipo_pago: number;
    fecha: Date;
    pagos_hechos: number;
    total_pagos: number;
    category:{
      nombre: string;
    },
    negocio:{
      nombre: string;
    },
    tipospago:{
      tipo: string
    },
    estatuspago:{
      estatus_pagos: string;
    }  
}