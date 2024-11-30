import { Component, EventEmitter, Output } from '@angular/core';
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
  imports: [ReactiveFormsModule, MatRadioModule],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.css'
})
export class GastosFormComponent {
  @Output() categoryCreated = new EventEmitter<void>();
  negociosRubros:any;
  selectedRubro: any;
  negocios:any;

  gastosForm: FormGroup = new FormGroup({});
  constructor(private gasSvc: CategoriasService, private negSvc: NegociosService){}

  ngOnInit(): void{
    this.gastosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      presupuesto: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  submit(){
    //if(this.gastosForm.valid){
      this.gasSvc.postCategoria(
        this.gastosForm.get('nombre')?.value,
        this.gastosForm.get('presupuesto')?.value
      ).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            title: 'Categoria agregada',
            text: 'La categoria se ha agregado correctamente',
            icon: 'success'
          });
          this.categoryCreated.emit();
        },
        (error)=>{
          const errorMessage = error.error?.message;
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          });
        }
      );
    /*}else{
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        icon: 'error'
      });
    }*/
  }
}