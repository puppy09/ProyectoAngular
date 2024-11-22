import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.css'
})
export class GastosFormComponent {

  gastosForm: FormGroup = new FormGroup({});
  constructor(private gasSvc: CategoriasService){}

  ngOnInit(): void{
    this.gastosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      presupuesto: new FormControl('', [Validators.required, Validators.min(0)]),
      
    });
  }
}