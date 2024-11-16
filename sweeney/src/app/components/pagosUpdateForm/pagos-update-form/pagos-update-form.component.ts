import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentasService } from '../../../services/cuentas/cuentas.service';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import { SubcategoriasService } from '../../../services/subcategorias/subcategorias.service';
import { DataServiceService } from '../../../services/dataService/data-service.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from '../../header/header.component';
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
  
  constructor(private dataSvc: DataServiceService,  private fb: FormBuilder, private route: Router, private cuenSrv: CuentasService, private  catSrv: CategoriasService, private subSrv: SubcategoriasService){
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
    
    const pago = this.dataSvc.getPagoData();
    if(pago){
      console.log(pago);
      this.pagosForm.patchValue({
        no_cuenta: pago.no_cuenta,
        categoria: pago.categoria,
        subcategoria: pago.subcategoria,
        descripcion: pago.descripcion,
        monto: pago.monto
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
}
