import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { PagosService } from '../../services/pagos/pagos.service';
@Component({
  selector: 'app-movimientos-form',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './movimientos-form.component.html',
  styleUrl: './movimientos-form.component.css'
})
export class MovimientosFormComponent implements OnInit{

  cuentas: any;
  categorias: any;
  subcategorias: any;

  constructor(private pagoSvc: PagosService,  private catSrv: CategoriasService, private snackBar: MatSnackBar, private  subSrv: SubcategoriasService, private cuenSrv: CuentasService, private pagosForm: FormGroup){}
  ngOnInit(): void {
    this.pagosForm = new FormGroup({
      num_cuenta: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descipcion: new FormControl('', Validators.required),
      montos: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoMovimiento: new FormControl('unica', Validators.required),
      diaPago: new FormControl({ value:'', disabled:true}),
      totalPagos: new FormControl({value:'', disabled: true})
    });

    
    this.pagosForm.get('tipoMovimiento')?.valueChanges.subscribe(value=>{
      if(value === 'unica'){
        this.pagosForm.get('diaPago')?.disable();
        this.pagosForm.get('totalPagos')?.disable();
      }
      else{
        this.pagosForm.get('diaPago')?.enable();
        this.pagosForm.get('totalPagos')?.enable();
      }
    });

    this.pagosForm.get('categoria')?.valueChanges.subscribe(categoryId => {
      this.loadSubcategorias(categoryId);
    });
  }

  loadActiveCuentas():void{
    this.cuenSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas activas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      });
  }

  loadActiveCategorias():void{
    this.catSrv.getCategoriasActivas().subscribe(
      (data)=>{
        this.categorias = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener categorias';
        this.snackBar.open('Error con categorias activas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(categoryId: number):void{
    this.subSrv.getSubcategoriasByCat(categoryId).subscribe(
      (data)=>{
        this.subcategorias = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener subcategorias';
        this.snackBar.open('Error con subcategorias '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching subcategorias: ', error);
      });
  }

  submitForm(){
    if(this.pagosForm.valid){
      const formData = this.pagosForm.value;
      if(formData.tipoMovimiento ===  'unica'){
        this.pagoSvc.postPago(
          formData.num_cuenta,
          formData.descipcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria
        ).subscribe(response =>{
              this.snackBar.open('Pago Registrado con exito', 'Cerrar',{
          duration: 5000
        })}, error =>{
            const errorMessage = error.error?.message || 'Error al registrar pago';
            this.snackBar.open('Error registrando pago'+errorMessage, 'Cerrar',{
            duration: 5000
          })
        });
      }else{
        this.pagoSvc.postPagoProgramado(
          formData.num_cuenta,
          formData.descipcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria,
          formData.dia_pago,
          formData.total_pagos
        ).subscribe(response =>{
          this.snackBar.open('Pago Programdo con exito', 'Cerrar',{
            duration: 5000
          })}, error=>{
            const errorMessage = error.error?.message || 'Error al programar pago';
            this.snackBar.open('Error programando pago'+errorMessage, 'Cerrar',{
            duration: 5000
          })
      })}
}}}
