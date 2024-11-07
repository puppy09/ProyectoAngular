export interface pagosProgramados{
    id_pagoprogramado: number;
    id_usuario: number;
    no_cuenta: string;
    descripcion: string;
    monto: number;
    categoria: number;
    subcategoria:number;
    dia_programado: number;
    pagos_hechos: number;
    total_pagos:number;
    estatus_pago:number;
    tipo_pago: number;
    category: {
            nombre: string;
    },
    negocio: {
            nombre: string;
    },
    tipospago: {
            tipo: string;
    },
    estatuspago: {
            estatus_pagos: string;
    }
}