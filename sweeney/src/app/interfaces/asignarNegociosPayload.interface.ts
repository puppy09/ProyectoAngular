import { negocio } from "./negocio.interface";
export interface asignarNegociosPayload{
    categoria: string;
    negocios: negocio[];
}