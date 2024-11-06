import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        this.snackBar.open('¡Registro exitoso! Por favor, inicie sesión', 'Cerrar',{
          duration: 5000 
        })

        setTimeout(() =>{
          this.router.navigate(['/']);
        })
      }, 
      error: (err) => {
        const errorMessage = err.error?.message || 'Error al registrar al usuario';
        this.snackBar.open('Error al registrar el usuario: '+errorMessage, 'Cerrar',{
          duration: 5000
        });
      }
    });
  }
}
