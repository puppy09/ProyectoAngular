import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario: any;

  constructor(private userSvc: AuthService, private snackBar: MatSnackBar){
  }
  ngOnInit(): void {
    this.userInfo();
  }
  userInfo():void{
    this.userSvc.userInfo().subscribe(
      (data)=>{
        this.usuario = data;
        console.log(data);
      },
      (error)=>{
        console.log("error obteniendo la informacion del usuario", error);
        const errorMessage = error.error?.message || 'Error al obtener informacion del usuario';
        this.snackBar.open('Error Obteniendo informacion del usuario '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching user: ', error);
      })
  }
}
