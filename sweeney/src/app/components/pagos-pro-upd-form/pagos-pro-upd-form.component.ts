import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pagos-pro-upd-form',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, HeaderComponent ],
  templateUrl: './pagos-pro-upd-form.component.html',
  styleUrl: './pagos-pro-upd-form.component.css'
})
export class PagosProUpdFormComponent {
  pagosProForms: FormGroup = new FormGroup({});
  selectedCategory: any;
  cuentas: any;
  categorias: any;
  subcategorias: any;
  pagoPro: any;
  constructor(private dataSvc: DataServiceService, private fb: FormBuilder,private router:Router, private snackBar: MatSnackBar, private pagoSvc: PagosProgService, private cueSvc: CuentasService, private catSvc: CategoriasService, private subSvc: SubcategoriasService){
    this.pagosProForms=this.fb.group({
        no_cuenta: new FormControl('', Validators.required),
        categoria: new FormControl('', Validators.required),
        subcategoria: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        monto: new FormControl('', [Validators.required, Validators.min(0)]),
        tipoMovimiento: new FormControl('', Validators.required),
        dia_programado: new FormControl('',Validators.required),
        total_pagos: new FormControl('', Validators.required)
    })

    this.pagoPro = this.dataSvc.getPagoData();
    console.log(this.pagoPro);
    console.log("Dia Programado"+this.pagoPro.dia_programado);
    console.log("Total de pagos"+this.pagoPro.total_pagos);
    if(this.pagoPro){
        this.pagosProForms.patchValue({
          no_cuenta: this.pagoPro.no_cuenta,
          categoria: this.pagoPro.categoria,
          subcategoria: this.pagoPro.subcategoria,
          descripcion: this.pagoPro.descripcion,
          monto: this.pagoPro.monto,
          dia_programado: this.pagoPro.dia_programado,
          total_pagos: this.pagoPro.total_pagos
        });
    }else{
      console.log("No hay pago");
    }
  }

  ngOnInit(){
    this.loadActiveCuentas();
    this.loadActiveCategorias();
    if(this.pagosProForms.value.categoria){
      this.loadSubcategorias({target: {value: this.pagosProForms.value.categoria}});
    }
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

  loadActiveCategorias():void{
    this.catSvc.getCategoriasActivas().subscribe(
      (data)=>{
        this.categorias = data;
      },
      (error)=>{
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(event: any):void{
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);
    this.subSvc.getSubcategoriasByCat(this.selectedCategory).subscribe(
      (data)=>{
        this.subcategorias=data;
      },
      (error)=>{
        console.error('Error fetching subcategorias: ', error);
      }
    )
  }
  cancel(){
    this.router.navigate(['/movimientos']);
  }
  submitForm(){
    const formData = this.pagosProForms.value;
    this.pagoSvc.updPagoProgramado(
      this.pagoPro.id_pagoprogramado,
      formData.no_cuenta,
      formData.descripcion,
      formData.monto,
      formData.categoria,
      formData.subcategoria,
      formData.dia_programado,
      formData.total_pagos
    ).subscribe(response=>{
      this.snackBar.open('Pago Actualizado con exito', 'Cerrar',{
        duration: 5000
      })}, error=>{
        console.log(error);
        const errorMessage = error.error?.message || 'Error al actualizar pago';
            this.snackBar.open('Error actualizando pago'+errorMessage, 'Cerrar',{
            duration: 5000
      })
  })
}}
