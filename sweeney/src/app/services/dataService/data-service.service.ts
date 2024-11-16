import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private pagoData: any
  constructor() { }

  setPagoData(data:any){
    this.pagoData=data;
  }

  getPagoData(){
    return this.pagoData;
  }

  clearPagoData(){
    this.pagoData=null;
  }
}
