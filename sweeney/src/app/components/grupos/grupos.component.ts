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
  imports: [RouterModule, ReactiveFormsModule, SidebarComponent, CarouselModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {

  grupos:any;
  auxGruposMiembro:any;
  miembro:[]=[];
  creador:[]=[];
  joinGpoForm:FormGroup = new FormGroup({});

  constructor(private dataSvc: DataServiceService, private route: ActivatedRoute, private gpoSvc: GruposCreadosService, private fb:FormBuilder, private router: Router){
    this.joinGpoForm = this.fb.group({
      tokenGpo: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void{
    //this.loadGrupos();
    this.loadGruposMiembro();
  }

/*  loadGrupos(){
    this.gpoSvc.getGruposCreados().subscribe(
      (data)=>{
        console.log(data);
        this.grupos=data;
      },(error)=>{
        console.log("error con grupos "+error.message);
      }
    );
  }*/

  loadGruposMiembro(){
    this.gpoSvc.getGruposMiembro().subscribe(
      (data)=>{
        //console.log(data);
        this.auxGruposMiembro=data;
        this.miembro=this.auxGruposMiembro.filter((grupo:any)=>grupo.tipo_usuario=="MIEMBRO");
        console.log(this.miembro);
        this.creador=this.auxGruposMiembro.filter((grupo:any)=>grupo.tipo_usuario=="CREADOR");
        console.log(this.creador);
      },(error)=>{
        console.log("error con grupos miembros "+error.message);
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
    this.loadGruposMiembro();
  }

  crear(){
    this.router.navigate(['crear/grupo'],{relativeTo: this.route});
    this.loadGruposMiembro();
  }
  gotoMain(grupo:any){
    console.log("go to main "+grupo);
    this.dataSvc.setGrupoData(grupo);
    this.router.navigate(['grupos/main']);
  }
}
