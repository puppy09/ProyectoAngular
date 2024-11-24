import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';  
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { CarouselModule } from 'primeng/carousel';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
  constructor(private route: ActivatedRoute, private gpoSvc: GruposCreadosService, private snackBar: MatSnackBar, private fb:FormBuilder, private router: Router){
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
          this.snackBar.open('Te has unido al grupo','Cerrar');
      },(error)=>{
        const errorMessage=error.error?.message|| 'Error uniendose a grupo';
        this.snackBar.open(errorMessage, 'Cerrar');
      }
    );
    this.loadGrupos();
  }

  crear(){
    this.router.navigate(['crear/grupo'],{relativeTo: this.route});
  }
}
