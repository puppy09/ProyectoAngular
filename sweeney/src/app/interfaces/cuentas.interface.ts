export interface Cuentas{
    ID: number;
  no_cuenta: string;
  fecha_vencimiento: string;
  saldo: number;
  nombre: string;
  id_usuario: number;
  estatus: number;
  estatusDetail: {
    estatus: string;
  };
}