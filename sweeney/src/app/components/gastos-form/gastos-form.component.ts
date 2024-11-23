import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NegociosService } from '../../services/negocios/negocios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
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
  constructor(private gasSvc: CategoriasService, private negSvc: NegociosService, private snackBar: MatSnackBar){}

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
          const errorMessage = error.error?.message || 'Error al obtener rubros';
          this.snackBar.open(errorMessage, 'Cerrar',{
          duration: 5000
        }
      )
  });
}

  loadNegocios(event:any){
    this.selectedRubro = event.target.value;
    this.negSvc.getNegocios(this.selectedRubro).subscribe(
      (data)=>{
          this.negocios=data;
      },(error)=>{
          const errorMessage = error.error?.message || 'Error al obtener negocios';
          this.snackBar.open(errorMessage, 'Cerrar',{
          duration: 5000
      })
    })
  }
  addNegocio(negocio: any){
    
  }
  submit(){
    
  }
}