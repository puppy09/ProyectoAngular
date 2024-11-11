import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-movimientos-form',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './movimientos-form.component.html',
  styleUrl: './movimientos-form.component.css'
})
export class MovimientosFormComponent {

  formlarioNewPago = new FormGroup({
    descripcion: new FormControl(''),

  })
}
