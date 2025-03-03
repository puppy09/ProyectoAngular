import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-pro-upd-form',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent ],
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
  constructor(private dataSvc: DataServiceService, private fb: FormBuilder,private router:Router, private pagoSvc: PagosProgService, private cueSvc: CuentasService, private catSvc: CategoriasService, private subSvc: SubcategoriasService){
    this.pagosProForms=this.fb.group({
        no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
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
        //const defaultCategory = this.categorias[0];
        //this.pagosProForms.controls['categoria'].setValue(defaultCategory.ID);
        // Trigger subcategories load for the single category
        //this.loadSubcategorias({ target: { value: defaultCategory.ID } });
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
        //const defaultSubcategory = this.subcategorias[0];
          //this.pagosProForms.controls['subcategoria'].setValue(defaultSubcategory.id_negocio);
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
      this.pagosProForms.get('no_cuenta')?.value,
      this.pagosProForms.get('descripcion')?.value,
      this.pagosProForms.get('monto')?.value,
      this.pagosProForms.get('categoria')?.value,
      this.pagosProForms.get('subcategoria')?.value,
      this.pagosProForms.get('dia_programado')?.value,
      this.pagosProForms.get('total_pagos')?.value
    ).subscribe(response=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Pago Programado Actualizado con exito',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/movimientos']);
      }, error=>{
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error Actualizando Pago Programado',
          showConfirmButton: false,
          timer: 1500
        })
      })
}}
