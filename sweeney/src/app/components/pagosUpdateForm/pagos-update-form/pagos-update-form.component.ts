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
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pagos-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, HeaderComponent],
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
  constructor(private router:Router, private snackBar: MatSnackBar, private pagoSvc: PagosService,  private dataSvc: DataServiceService,  private fb: FormBuilder, private route: Router, private cuenSrv: CuentasService, private  catSrv: CategoriasService, private subSrv: SubcategoriasService){
    this.pagosForm = this.fb.group({
      no_cuenta: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(0)]),
      tipoMovimiento: new FormControl('', Validators.required),
      diaPago: new FormControl({ value:'', disabled:true}),
      totalPagos: new FormControl({value:'', disabled: true})
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
    }else{
      console.log("No hay pago");
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
      },
      (error)=>{
        console.error('Error fetching categorias: ', error);
      });
  }

  loadSubcategorias(event: any):void{
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);
    this.subSrv.getSubcategoriasByCat(this.selectedCategory).subscribe(
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
    //if(this.pagosForm.valid){
      const formData=this.pagosForm.value;
      this.pagoSvc.updPago(
        this.pago.id_pago,
        formData.no_cuenta,
        formData.descripcion,
        formData.monto,
        formData.categoria,
        formData.subcategoria
      ).subscribe(response=>{
        this.snackBar.open('Pago Actualizado con exito', 'Cerrar',{
            duration: 5000
        })}, error=>{
          const errorMessage = error.error?.message || 'Error al actualizar pago';
            this.snackBar.open('Error actualizando pago'+errorMessage, 'Cerrar',{
            duration: 5000
        })}
    )//}
    //else{
      //alert("Formulario Invalido o fondos insuficientes");
    //}
  }
}
