import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';  
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { CarouselModule } from 'primeng/carousel';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataServiceService } from '../../services/dataService/data-service.service';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HeaderComponent, SidebarComponent, CarouselModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {

  grupos:any;
  joinGpoForm:FormGroup = new FormGroup({});
  constructor(private dataSvc: DataServiceService, private route: ActivatedRoute, private gpoSvc: GruposCreadosService, private fb:FormBuilder, private router: Router){
    this.joinGpoForm = this.fb.group({
      tokenGpo: new FormControl('', Validators.required)
    })
  }

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
  
  joinGrupo(){
    const formData = this.joinGpoForm.value;
    this.gpoSvc.joinGrupo(formData.tokenGpo).subscribe(
      (data)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Te has unido al grupo',
          showConfirmButton: false,
          timer: 1500
        })
      },(error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error uniendose a grupo',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
    this.loadGrupos();
  }

  crear(){
    this.router.navigate(['crear/grupo'],{relativeTo: this.route});
  }
  gotoMain(grupo:any){
    this.dataSvc.setGrupoData(grupo);
    this.router.navigate(['grupos/main']);
  }
}
