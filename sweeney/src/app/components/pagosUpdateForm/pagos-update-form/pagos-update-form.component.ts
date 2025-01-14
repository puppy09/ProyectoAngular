import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from '../../../services/cuentas/cuentas.service';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import { SubcategoriasService } from '../../../services/subcategorias/subcategorias.service';
import { DataServiceService } from '../../../services/dataService/data-service.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
import { PagosService } from '../../../services/pagos/pagos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pagos-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent],
  templateUrl: './pagos-update-form.component.html',
  styleUrl: './pagos-update-form.component.css'
})
export class PagosUpdateFormComponent {
  pagosForm: FormGroup = new FormGroup({});
  selectedCategory: any;
  cuentas: any;
  categorias: any;
  subcategorias: any;
  pago: any;
  constructor(private router:Router, private pagoSvc: PagosService,  private dataSvc: DataServiceService,  private fb: FormBuilder, private route: Router, private cuenSrv: CuentasService, private  catSrv: CategoriasService, private subSrv: SubcategoriasService){
    this.pagosForm = this.fb.group({
      no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(0)])
    })
    
    this.pago = this.dataSvc.getPagoData();
    if(this.pago){
      console.log(this.pago);
      this.pagosForm.patchValue({
        no_cuenta: this.pago.no_cuenta,
        categoria: this.pago.categoria,
        subcategoria: this.pago.subcategoria,
        descripcion: this.pago.descripcion,
        monto: this.pago.monto
      });
    }
  }

  ngOnInit(){
    this.loadActiveCategorias();
    this.loadActiveCuentas();
    if(this.pagosForm.value.categoria){
      this.loadSubcategorias({target: {value: this.pagosForm.value.categoria}});
    }
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
    this.catSrv.getCategoriasActivas().subscribe(
      (data)=>{
        this.categorias = data;
          //const defaultCategory = this.categorias[0];
          //this.pagosForm.controls['categoria'].setValue(defaultCategory.ID);
          // Trigger subcategories load for the single category
         // this.loadSubcategorias({ target: { value: defaultCategory.ID } });
      },
      (error)=>{
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(event: any):void{
    this.subcategorias = [];
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);
    this.subSrv.getSubcategoriasByCat(this.selectedCategory).subscribe(
      (data)=>{
        this.subcategorias=data;
        //console.log("subcategorias "+this.subcategorias);
          //const defaultSubcategory = this.subcategorias[0];
          //this.pagosForm.controls['subcategoria'].setValue(defaultSubcategory.id_negocio);
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
    //if(this.pagosForm.valid){
      const formData=this.pagosForm.value;
      this.pagoSvc.updPago(
        this.pago.id_pago,
        this.pagosForm.get('no_cuenta')?.value,
        this.pagosForm.get('descripcion')?.value,
        this.pagosForm.get('monto')?.value,
        this.pagosForm.get('categoria')?.value,
        this.pagosForm.get('subcategoria')?.value
      ).subscribe(response=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Pago Actualizado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/movimientos']);
        }, error=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error Actualizando Pago',
            showConfirmButton: false,
            timer: 1500
          })
      }
    )//}
    //else{
      //alert("Formulario Invalido o fondos insuficientes");
    //}
  }
}
