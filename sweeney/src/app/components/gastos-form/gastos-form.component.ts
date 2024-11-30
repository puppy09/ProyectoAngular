import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NegociosService } from '../../services/negocios/negocios.service';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { SubcategoriasService } from '../../services/subcategorias/subcategorias.service';
@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, SidebarComponent],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.css'
})
export class GastosFormComponent {
  @Output() categoryCreated = new EventEmitter<void>();
  negociosRubros:any;
  selectedRubro: any;
  rubros:any;
  negocios:any;
  selectedCategoria:any;
  subcategorias:any;
  subcategoriaForm: FormGroup = new FormGroup({});

  constructor(private gasSvc: CategoriasService, private negSvc: NegociosService, private dataSvc:DataServiceService, private subSvc:SubcategoriasService){}

  ngOnInit(): void{
    this.selectedCategoria = this.dataSvc.getCategoriaData();
    console.log(this.selectedCategoria);
    this.loadSubcategorias(this.selectedCategoria);
    this.loadRubros();
    this.subcategoriaForm = new FormGroup({
      rubros: new FormControl('', Validators.required),
      negocios: new FormControl('', Validators.required),
      addNegocio: new FormControl('', Validators.required),
      newNewgocio: new FormControl({value: '', disabled: true}, Validators.required)
    });
    this.subcategoriaForm.get('addNegocio')?.valueChanges.subscribe(value=>{
      if(value === 'si'){
        this.subcategoriaForm.get('newNewgocio')?.enable();
      }
      else{
        this.subcategoriaForm.get('newNewgocio')?.disable();
      }
    });
  }

  loadSubcategorias(categoria:any){
    this.subSvc.getSubcategoriasByCat(categoria.ID).subscribe((data)=>{
      this.subcategorias = data;
      console.log(this.subcategorias);
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        text: 'Error al cargar las subcategorias',
        timer: 1500
      })
    })
  }
  loadRubros(){
    this.negSvc.getRubros().subscribe((data)=>{
      this.rubros = data;
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title:'Error al cargar los rubros',
        text: errorMessage,
        timer: 1500
      })
    })
  }
  loadNegocios(event:any){
    this.selectedRubro = event.target.value;
    console.log("selectedRubro: "+this.selectedRubro);
    this.negSvc.getNegocios(this.selectedRubro).subscribe((data)=>{
      this.negocios = data;
      console.log(this.negocios);
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar los negocios',
        text: errorMessage,
        timer: 1500
      })
    })
  }
  submit(){
    if(this.subcategoriaForm.get('addNegocio')?.value === 'si'){
      this.subSvc.regAsigNegocio(this.subcategoriaForm.get('newNewgocio')?.value, this.selectedRubro, this.selectedCategoria.ID).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Negocio registrado y asignado correctamente',
          text: 'Negocio registrado correctamente',
          timer: 1500
        })
      }, (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar y asignar negocio',
          text: errorMessage,
          timer: 1500
        })
      });
    }
    else{
      this.subSvc.postSubcategoria(this.selectedCategoria.ID, this.subcategoriaForm.get('negocios')?.value).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Subcategoria registrada correctamente',
          timer: 1500
        })
      }, (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la subcategoria',
          text: errorMessage,
          timer: 1500
        })
      });
    }
  }
}