import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';  

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {

}
