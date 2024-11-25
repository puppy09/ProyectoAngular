import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NegociosService } from '../../services/negocios/negocios.service';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, SidebarComponent, MatRadioModule],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.css'
})
export class GastosFormComponent {

  negociosRubros:any;
  selectedRubro: any;
  negocios:any;

  gastosForm: FormGroup = new FormGroup({});
  constructor(private gasSvc: CategoriasService, private negSvc: NegociosService){}

  ngOnInit(): void{
    this.gastosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      presupuesto: new FormControl('', [Validators.required, Validators.min(0)]),
      tipo_negocio: new FormControl('',[Validators.required]),
      negocios: new FormControl('',[Validators.required]),
      addNuevo: new FormControl('', [Validators.required]),
      nuevoNegocio: new FormControl({value: '', disabled:true},[Validators.required])
    });
    this.loadRubros();

    this.gastosForm.get('addNuevo')?.valueChanges.subscribe(value=>{
      if(value === 'si'){
        this.gastosForm.get('negocios')?.disable();
        this.gastosForm.get('nuevoNegocio')?.enable();
      }
      else{
        this.gastosForm.get('nuevoNegocio')?.disable();
        this.gastosForm.get('negocios')?.enable();
      }
    });
  }

  
  loadRubros(){
      this.negSvc.getRubros().subscribe(
        (data)=>{
            this.negociosRubros=data;
            console.log(data);
        },
        (error)=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error obteniendo rubros de negocios',
            showConfirmButton: false,
            timer: 1500
          })
        });
}

  loadNegocios(event:any){
    this.selectedRubro = event.target.value;
    this.negSvc.getNegocios(this.selectedRubro).subscribe(
      (data)=>{
          this.negocios=data;
      },(error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error obteniendo negocios',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  addNegocio(negocio: any){
    
  }
  submit(){
    
  }
}