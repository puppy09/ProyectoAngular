import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private pagoData: any
  private pagoProData: any
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

  //Servicios de Pagos Programados
  setPagoProData(data: any){
    this.pagoProData=data;
  }
  
  getPagoProData(){
    return this.pagoProData;
  }

  clearPagoProData(){
    this.pagoProData=null;
  }
}
