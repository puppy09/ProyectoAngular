import { Component } from '@angular/core';
import { categoriaGrupal } from '../../interfaces/gastosGrupales.interface';
import { GruposCategoriasService } from '../../services/gruposCategorias/grupos-categorias.service';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';
import { Router } from '@angular/router';
import { GruposSubcategoriasService } from '../../services/gruposSubcategorias/grupos-subcategorias.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grupos-post-pagos',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, MatRadioModule],
  templateUrl: './grupos-post-pagos.component.html',
  styleUrl: './grupos-post-pagos.component.css'
})
export class GruposPostPagosComponent {

  pagosForm: FormGroup = new FormGroup({});
  cuentas:any;
  grupo:any;
  categorias:any;
  selectedCategory ='';
  subcategorias:any;
  constructor(private dataSvc: DataServiceService, private router: Router,  private catSrv: GruposCategoriasService, private  subSrv: GruposSubcategoriasService, private cuenSrv: CuentasService, private gpoSvc: GruposPagosService){
    this.grupo = this.dataSvc.getGrupoData();
  }

  ngOnInit(): void {
    this.pagosForm = new FormGroup({
      no_cuenta: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoMovimiento: new FormControl('', Validators.required),
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
    this.loadActiveCuentas();
    this.loadActiveCategorias();
  }

  loadActiveCuentas():void{
    this.cuenSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.cuentas = data;
      },
      (error)=>{
        console.error('Error fetching cuentas: ', error);
      });
  }

  loadActiveCategorias():void{
    this.catSrv.getCategoriaGrupalActiva(this.grupo.id_grupo).subscribe(
      (data)=>{
        console.log(data);
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
    this.selectedCategory = event.target.value;
    console.log("selectedCategory: "+this.selectedCategory);
    console.log("grupo.id_grupo: "+this.grupo.id_grupo);
    this.subSrv.getSubcategoriasCategoria(this.grupo.id_grupo, this.selectedCategory).subscribe(
      (data)=>{
        console.log(data);
        this.subcategorias=data;
        this.subcategorias = data;
        const defaultSubcategory = this.subcategorias[0];
        this.pagosForm.controls['subcategoria'].setValue(defaultSubcategory.id_negocio);
      },
      (error)=>{
        console.error('Error fetching subcategorias: ', error);
      }
    )
  }
  submitForm(){
    //if(this.pagosForm.valid){
      const formData = this.pagosForm.value;
      console.log("Monto:"+formData.monto);
      if(formData.tipoMovimiento ===  'unica'){
        this.gpoSvc.postPagoGrupal(
          this.grupo.id_grupo,
          formData.no_cuenta,
          formData.descripcion,
          formData.monto,
          formData.categoria,
          formData.subcategoria,

        ).subscribe(response =>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Pago regustrado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        this.router.navigate(['/grupos/main/single/pagos']);
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
        this.gpoSvc.postPagoProgramadoGrupal(
          this.grupo.id_grupo,
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
        this.router.navigate(['/grupos/main/single/pagos']);
        }, error=>{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: 'Error programando pago',
              showConfirmButton: false,
              timer: 1500
            })
      })}
  /*}else{
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: 'Formulario invalido',
      showConfirmButton: false,
      timer: 1500
    })
  }*/
  }
}
