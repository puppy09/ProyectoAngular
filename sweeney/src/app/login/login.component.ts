import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string='';
  password: string='';

  constructor (private authSrv: AuthService, private router: Router, private snackBar: MatSnackBar){
   
  }

  login(): void{
    this.authSrv.login(this.email, this.password).subscribe({
      next: ()=> {
        this.router.navigate(['/menu']);
      },
      error: (err) =>{
        const errorMessage = err.error?.message || 'Error al registrar al usuario';
        this.snackBar.open('Error al loguear el usuario: '+errorMessage, 'Cerrar',
        {
          duration: 5000
        });
      }
    })
  }
}
