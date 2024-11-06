import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HttpClient } from '@angular/common/http';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MenuPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sweeney';
}
