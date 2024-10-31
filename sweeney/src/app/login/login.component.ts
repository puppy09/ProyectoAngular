import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
      next: ()=> this.router.navigate(['/menu']),
      error: (err) => alert({'Error logeando': err})
    })
  }
}
