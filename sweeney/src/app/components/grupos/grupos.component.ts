import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';  
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { CarouselModule } from 'primeng/carousel';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CarouselModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {

  grupos:any;
  constructor(private gpoSvc: GruposCreadosService){}

  ngOnInit(): void{
    this.loadGrupos();
  }

  loadGrupos(){
    this.gpoSvc.getGruposMiembro().subscribe(
      (data)=>{
        console.log(data);
        this.grupos=data;
      },(error)=>{
        console.log("error con grupos "+error.message);
      }
    );
  }
}
