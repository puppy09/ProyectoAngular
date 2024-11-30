import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GruposCategoriasService } from '../../services/gruposCategorias/grupos-categorias.service';
import Swal from 'sweetalert2';
import { GruposSubcategoriasService } from '../../services/gruposSubcategorias/grupos-subcategorias.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';

@Component({
  selector: 'app-grupos-form-pago-pro',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './grupos-form-pago-pro.component.html',
  styleUrl: './grupos-form-pago-pro.component.css'
})
export class GruposFormPagoProComponent {

  movimientoProForm:FormGroup = new FormGroup({});
  pagoPro: any;
  categorias:any;
  selectedCategory:any;
  subcategorias:any;
  cuentas:any;
  constructor(private cueSvc: CuentasService,  private dataSvc: DataServiceService, private movProSvc: GruposMovimientosService, private fb: FormBuilder, private catSvc: GruposCategoriasService, private subSvc: GruposSubcategoriasService){
    this.movimientoProForm = this.fb.group({
        no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
        categoria: new FormControl('', Validators.required),
        subcategoria: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        monto: new FormControl('', [Validators.required, Validators.min(0)]),
        dia_programado: new FormControl('',Validators.required),
        total_pagos: new FormControl('', Validators.required)
    })

    this.pagoPro=dataSvc.getPagoGrupalProData();
    if(this.pagoPro){
      console.log(this.pagoPro);
      this.movimientoProForm.patchValue({
        no_cuenta: this.pagoPro.no_cuenta,
        categoria: this.pagoPro.categoria,
        subcategoria: this.pagoPro.subcategoria,
        descripcion: this.pagoPro.descripcion,
        monto: this.pagoPro.monto,       
        dia_programado: this.pagoPro.dia_programado,
        total_pagos: this.pagoPro.total_pagos
      });
    }
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(){
    this.catSvc.getCategoriaGrupalActiva(this.pagoPro.id_grupo).subscribe(data => {
      this.categorias = data;
    }, (error) => {
      console.log(error);
    });
  }
  loadActiveCuentas():void{
    this.cueSvc.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas = data;
      },
      (error)=>{
        console.error('Error fetching cuentas: ', error);
      });
  }

  loadSubcategorias(event: any){
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);
    this.subSvc.getSubcategoriasCategoria(this.pagoPro.id_grupo, this.selectedCategory).subscribe(
      (data)=>{
        this.subcategorias=data;
      },
      (error)=>{
        console.error('Error fetching subcategorias: ', error);
      })
  }
  submitForm(){
    console.log(this.movimientoProForm.value);
  }
}
