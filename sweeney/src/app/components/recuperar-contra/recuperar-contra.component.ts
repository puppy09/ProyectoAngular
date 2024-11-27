import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';import { AuthService } from '../../services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-recuperar-contra',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recuperar-contra.component.html',
  styleUrl: './recuperar-contra.component.css'
})
export class RecuperarContraComponent {


  email: string = '';
  emailForm: FormGroup = new FormGroup({});
  constructor(private router: Router, private authSrv: AuthService) {}

  recuperarContra(): void {
    this.authSrv.recuperarContra(this.email).subscribe(
      (data)=>{
          Swal.fire({
          position: "top-end", 
          icon: "success",
          title: 'Se ha enviado un correo de recuperación',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el correo de recuperación',
        });
      }
    );
  }

  volverLogin(): void {
    this.router.navigate(['/login']);
  }
}
