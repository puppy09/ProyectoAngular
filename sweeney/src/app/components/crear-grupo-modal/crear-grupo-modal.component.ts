import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-grupo-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-grupo-modal.component.html',
  styleUrl: './crear-grupo-modal.component.css'
})
export class CrearGrupoModalComponent {

  crearGrupoForm:FormGroup = new FormGroup({});
  constructor(private gpoSvc: GruposCreadosService, private snackBar: MatSnackBar, private fb:FormBuilder){
    this.crearGrupoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('',Validators.required)
    })
  }
  submit(){
    if(this.crearGrupoForm.valid){
      const formData = this.crearGrupoForm.value;
    this.gpoSvc.crearGrupo(formData.nombre, formData.descripcion).subscribe(
      (data)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grupo creado con exito",
          showConfirmButton: false,
          timer: 1500
        })
      },(error)=>{
        const errorMessage = error.error?.message || "Error creando grupo";
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: 'Formulario Invalido',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
