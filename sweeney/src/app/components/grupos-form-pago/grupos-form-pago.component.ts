import { Component, importProvidersFrom } from '@angular/core';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GruposCategoriasService } from '../../services/gruposCategorias/grupos-categorias.service';
import { GruposSubcategoriasService } from '../../services/gruposSubcategorias/grupos-subcategorias.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos-form-pago',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule],
  templateUrl: './grupos-form-pago.component.html',
  styleUrl: './grupos-form-pago.component.css'
})
export class GruposFormPagoComponent {
  
  pagoForm:FormGroup = new FormGroup({});
  pagoPro: any;
  cuentas:any;
  categorias:any;
  selectedCategory:any;
  subcategorias:any;
  constructor(private cueSvc: CuentasService,  private dataSvc: DataServiceService, private pagoGpoSvc: GruposPagosService, private fb: FormBuilder, private catSvc: GruposCategoriasService, private subSvc: GruposSubcategoriasService){
    this.pagoForm = this.fb.group({
        no_cuenta: new FormControl({value:'', disabled: true},[Validators.required, Validators.pattern(/^\d{16}$/)]),
        categoria: new FormControl('', Validators.required),
        subcategoria: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        monto: new FormControl('', [Validators.required, Validators.min(0)])
    })

    this.pagoPro=this.dataSvc.getPagoGrupalData();
    console.log("asi llego el pago de la otra pantalla "+this.pagoPro);
    console.log("La cuenta es "+typeof this.pagoPro.no_cuenta);
    if(this.pagoPro){
      console.log(this.pagoPro);
      this.pagoForm.patchValue({
        no_cuenta: this.pagoPro.no_cuenta,
        categoria: this.pagoPro.categoria,
        subcategoria: this.pagoPro.subcategoria,
        descripcion: this.pagoPro.descripcion,
        monto: this.pagoPro.monto
      });
    }
  }

  ngOnInit():void{
    this.loadActiveCuentas();
    this.loadCategorias();
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

  loadCategorias():void{
    this.catSvc.getCategoriaGrupalActiva(this.pagoPro.id_grupo).subscribe(data => {
      this.categorias = data;
    }, error => {
      console.error('Error fetching categorias: ', error);
    });
  }

  loadSubcategorias(event:any):void{
    this.selectedCategory = event.target.value;
    this.subSvc.getSubcategoriasCategoria(this.pagoPro.id_grupo, this.selectedCategory).subscribe(data => {
      this.subcategorias = data;
    }, error => {
      console.error('Error fetching subcategorias: ', error);
    });
  }
  submitForm(){
    console.log(this.pagoForm.get('no_cuenta')?.value);
    const formData = this.pagoForm.value;
    console.log("FORM DATA NO DE CUENTA "+formData.no_cuenta);
    this.pagoGpoSvc.updatePagoGrupal(
      this.pagoPro.id_grupo, 
      this.pagoPro.id_pago, 
      this.pagoForm.get('no_cuenta')?.value,
      this.pagoForm.get('descripcion')?.value,
      this.pagoForm.get('monto')?.value,
      this.pagoForm.get('categoria')?.value,
      this.pagoForm.get('subcategoria')?.value
    ).subscribe(data => {
      Swal.fire({
        title: 'Pago actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 1500
      });
    }, error => {
      const errorMessage = error.error?.message;
      Swal.fire({
        title: 'Error al actualizar el pago '+errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 1500
      });
    });
  }

}
