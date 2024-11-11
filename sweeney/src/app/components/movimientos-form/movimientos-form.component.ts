import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
@Component({
  selector: 'app-movimientos-form',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './movimientos-form.component.html',
  styleUrl: './movimientos-form.component.css'
})
export class MovimientosFormComponent {

}
