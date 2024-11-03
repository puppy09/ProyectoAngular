import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

}
