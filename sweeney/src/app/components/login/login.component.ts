import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  constructor (private authSrv: AuthService, private router: Router){
   
  }

  login(): void{
    this.authSrv.login(this.email, this.password).subscribe({
      next: ()=> {
        this.router.navigate(['/menu']);
      },
      error: (err) =>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error logueando',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  navigateToRecuperar(): void{
    this.router.navigate(['/recuperar/contra']);
  }
}
