export interface gruposPagos{
    id_pago:number,
    id_grupo: number,
    id_usuario: number,
    no_cuenta: string,
    descripcion: string,
    monto: number,
    categoria: number,
    subcategoria: number,
    estatus: number,
    fecha: Date,
    tipo_pago: number,
    pagos_hechos:number,
    total_pagos:number,
    user:{
        nombre:string
    },
    categoriagrupal:{
        categoria:string
    },
    negocio:{
        nombre: string
    },
    tipospago:{
        tipo:string
    },
    estatuspago:{
        estatus_pagos:string
    }
}

export interface gruposMovimientos{
    id_movimiento: number,
    id_grupo: number,
    id_usuario: number,
    tipo_movimiento: number,
    id_pago: number,
    no_cuenta: string,
    descripcion: string,
    monto: number,
    fecha:Date,
    movimientoDetail:{
        tipo_movimiento: string
    },
    userDetail:{
        nombre: string
    }
}

export interface gruposPagosProgramados{
    id_pago:number,
    id_grupo:number,
    id_usuario:number,
    no_cuenta:string,
    descripcion: string,
    monto:number,
    categoria:number,
    subcategoria:number,
    dia_programado:number,
    pagos_hechos:number,
    total_pagos:number,
    estatus_pago: number,
    categoriagrupal:{
        categoria:string
    },
    negocio:{
        nombre:string
    },
    estatusDetail:{
        estatus_pagos:string
    },
    usuarioDetail:{
        nombre:string
    }
}