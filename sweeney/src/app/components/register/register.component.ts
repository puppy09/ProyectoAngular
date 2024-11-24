import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  nombre: string = '';
  apellidos: string = '';

  constructor (private authSrv: AuthService, private router: Router, private snackBar: MatSnackBar){
   
  }

  register(): void{
    this.authSrv.register(this.nombre, this.apellidos, this.email, this.password).subscribe({
      next: ()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Registro exitoso, por favor inicie sesión',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() =>{
          this.router.navigate(['/']);
        })
      }, 
      error: (err) => {
        const errorMessage = err.error?.message || 'Error al registrar al usuario';
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
