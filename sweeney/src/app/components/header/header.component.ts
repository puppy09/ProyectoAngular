import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario: any;

  constructor(private userSvc: AuthService){
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
        console.error('Error fetching user: ', error);
      })
  }
}
