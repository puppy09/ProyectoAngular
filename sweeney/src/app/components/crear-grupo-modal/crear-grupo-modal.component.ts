import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        this.snackBar.open('Se ha creado el grupo exitosamente','Cerrar');
      },(error)=>{
        const errorMessage = error.error?.message || "Error creando grupo";
        this.snackBar.open(`Error ${errorMessage}`,'Cerrar');
      }
    );
    }else{
      this.snackBar.open(`Error Formulario invalido`,'Cerrar');
    }
  }
}
