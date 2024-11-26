import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [SidebarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
  user: any;
  contraForm: FormGroup = new FormGroup({});
  constructor(private authSrv: AuthService, private fb: FormBuilder, private profiSvc: ProfileService){

  }

  ngOnInit():void{
    this.loadUserInfo();
    this.contraForm = new FormGroup({
      contraActual: new FormControl('', Validators.required),
      nuevaContra: new FormControl('', Validators.required),
      confirmContra: new FormControl('', Validators.required)
    });
  }

  loadUserInfo():void{
    this.authSrv.userInfo().subscribe((data)=>{
      this.user = data;
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error obteniendo la información del usuario',
      });
    });
  }
  cambiarContra():void{
    const data = this.contraForm.value;
    console.log(data.contraActual);
    console.log(data.nuevaContra);
    console.log(data.confirmContra);
    this.profiSvc.cambiarPsw(data.contraActual, data.nuevaContra, data.confirmContra).subscribe(
      (data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada correctamente',
        });
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar la contraseña',
        });
      }
    );
  }
}
