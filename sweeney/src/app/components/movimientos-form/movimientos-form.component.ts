import { Component, computed, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { PagosService } from '../../services/pagos/pagos.service';
import {MatRadioModule} from '@angular/material/radio';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos-form',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, MatRadioModule],
  templateUrl: './movimientos-form.component.html',
  styleUrl: './movimientos-form.component.css'
})
export class MovimientosFormComponent implements OnInit{

  pagosForm: FormGroup = new FormGroup({});
  cuentas: any;
  categorias: any;
  selectedCategory = '';
  subcategorias: any;


  constructor(private router: Router, private pagoProSvc: PagosProgService,private pagoSvc: PagosService,  private catSrv: CategoriasService, private  subSrv: SubcategoriasService, private cuenSrv: CuentasService){}
  
  
  ngOnInit(): void {
    this.pagosForm = new FormGroup({
      no_cuenta: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoMovimiento: new FormControl('unica', Validators.required),
      diaPago: new FormControl({ value:'', disabled:true}),
      totalPagos: new FormControl({value:'', disabled: true})
    });

    this.loadActiveCategorias();
    this.loadActiveCuentas();

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
  }

  loadActiveCuentas():void{
    this.cuenSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas = data;
        const defaultCuenta = this.cuentas[0];
        this.pagosForm.controls['no_cuenta'].setValue(defaultCuenta.no_cuenta);
      },
      (error)=>{
        console.error('Error fetching cuentas: ', error);
      });
  }

  loadActiveCategorias():void{
    this.catSrv.getCategoriasActivas().subscribe(
      (data)=>{
        this.categorias = data;
        const defaultCategory = this.categorias[0];
        this.pagosForm.controls['categoria'].setValue(defaultCategory.ID);
        // Trigger subcategories load for the single category
        this.loadSubcategorias({ target: { value: defaultCategory.ID } });
      },
      (error)=>{
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(event: any):void{
    this.subcategorias = [];
    this.selectedCategory = event.target.value;
    console.log("selectedCategory: "+this.selectedCategory);
    this.subSrv.getSubcategoriasByCat(this.selectedCategory).subscribe(
      (data)=>{
        this.subcategorias=data;
        const defaultSubcategory = this.subcategorias[0];
        this.pagosForm.controls['subcategoria'].setValue(defaultSubcategory.id_negocio);
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
      const formData = this.pagosForm.value;
      console.log("Monto:"+formData.monto);
      if(formData.tipoMovimiento ===  'unica'){
        this.pagoSvc.postPago(
          formData.no_cuenta,
          formData.descripcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria
        ).subscribe(response =>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Pago registrado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        this.router.navigate(['/movimientos']);
        }, error =>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error registrando pago',
            showConfirmButton: false,
            timer: 1500
          })
        });
      }else{
        this.pagoProSvc.postPagoProgramado(
          formData.no_cuenta,
          formData.descripcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria,
          formData.diaPago,
          formData.totalPagos
        ).subscribe(response =>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Pago programado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/movimientos']);
        }, error=>{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'Error programando pago',
              showConfirmButton: false,
              timer: 1500
            })
      })}
  }
}
