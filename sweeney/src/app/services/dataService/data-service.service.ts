import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private pagoData: any
  private movPro: any
  private cuentaData: any
  private grupoData:any
  private movProGrupal:any
  private pagoProgramado:any
  private pagoGrupal:any
  private categoriaData:any
  private categoriaGrupalData:any
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

  //Servicios de Grupos
  setGrupoData(data:any){
    this.grupoData=data;
  }
   
  getGrupoData(){
    return this.grupoData;
  }

  clearGrupoData(){
    this.grupoData=null;
  }

  //Servicio de Movimientos Programados Grupales
  setMovProGrupalData(data:any){
    this.movProGrupal=data;
  }

  getMovProGrupalData(){
    return this.movProGrupal;
  }
  
  clearMovProGrupalData(){
    this.movProGrupal=null;
  }

  //Servicio de Pagos Programados
  setPagoGrupalProData(data:any){
    this.pagoProgramado=data;
  }

  getPagoGrupalProData(){
    return this.pagoProgramado;
  }

  clearPagoGrupalProData(){
    this.pagoProgramado=null;
  }

  //Servicio de Pagos Grupales
  setPagoGrupalData(data:any){
    this.pagoGrupal=data;
  }

  getPagoGrupalData(){
    return this.pagoGrupal;
  }
  
  clearPagoGrupalData(){
    this.pagoGrupal=null;
  }

  //Servicios de Categorias
  setCategoriaData(data:any){
    this.categoriaData=data;
  }

  getCategoriaData(){
    return this.categoriaData;
  }

  clearCategoriaData(){
    this.categoriaData=null;
  }

  //SERVICIOS DE CATEGORIAS GRUPALES
  setCategoriaGrupalData(data:any){
    this.categoriaGrupalData=data;
  }

  getCategoriaGrupalData(){
    return this.categoriaGrupalData;
  }

  clearCategoriaGrupalData(){
    this.categoriaGrupalData=null;
  }
}
