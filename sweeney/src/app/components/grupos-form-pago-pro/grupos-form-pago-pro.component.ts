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
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';

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
  constructor(private cueSvc: CuentasService,  private dataSvc: DataServiceService, private pagoGpoSvc: GruposPagosService, private fb: FormBuilder, private catSvc: GruposCategoriasService, private subSvc: GruposSubcategoriasService){
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
    console.log(this.pagoPro);
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
    this.loadActiveCuentas();
  }

  loadCategorias(){
    this.catSvc.getCategoriaGrupalActiva(this.pagoPro.id_grupo).subscribe(data => {
      this.categorias = data;
      const defaultCategory = this.categorias[0];
      this.movimientoProForm.controls['categoria'].setValue(defaultCategory.ID);
        // Trigger subcategories load for the single category
        this.loadSubcategorias({ target: { value: defaultCategory.ID } });
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
        const defaultSubcategory = this.subcategorias[0];
        this.movimientoProForm.controls['subcategoria'].setValue(defaultSubcategory.id_negocio);
      },
      (error)=>{
        console.error('Error fetching subcategorias: ', error);
      })
  }
  submitForm(){
    const formData = this.movimientoProForm.value;
    this.pagoGpoSvc.updatePagoProgramadoGrupal(
      this.pagoPro.id_pago, 
      this.pagoPro.id_grupo, 
      this.movimientoProForm.get('no_cuenta')?.value, 
      this.movimientoProForm.get('descripcion')?.value, 
      this.movimientoProForm.get('monto')?.value, 
      this.movimientoProForm.get('categoria')?.value, 
      this.movimientoProForm.get('subcategoria')?.value, 
      this.movimientoProForm.get('dia_programado')?.value, 
      this.movimientoProForm.get('total_pagos')?.value).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Pago programado actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 1500
        });
      },
      (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }
}
