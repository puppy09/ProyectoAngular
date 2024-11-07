export interface Movimientos{
    id_movimiento: string;
  id_usuario: string;
  id_pago: string;
  no_cuenta: string;
  descripcion: string;
  tipo_movimiento: string;
  monto: number;
  fecha: Date;
  movimientoDetail:{
    tipo_movimiento: string;
  }
}