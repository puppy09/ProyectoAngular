import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private pagoData: any
  private movPro: any
  private cuentaData: any
  constructor() { }

  //Servicios de Pagos
  setPagoData(data:any){
    this.pagoData=data;
  }

  getPagoData(){
    return this.pagoData;
  }

  clearPagoData(){
    this.pagoData=null;
  }

  //Servicios de Cuentas
  setCuentaData(data: any){
    this.cuentaData=data;
  }
  
  getCuentaData(){
    return this.cuentaData;
  }

  clearCuentaData(){
    this.cuentaData=null;
  }

  //Servicios de Movimientos Programados
  setmovProData(data: any){
    this.movPro=data;
  }
  
  getmovProData(){
    return this.movPro;
  }

  clearmovProData(){
    this.movPro=null;
  }
}
