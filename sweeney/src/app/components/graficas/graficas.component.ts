import { Component } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

interface DataPoint {
  name: string;
  y: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent {

  totalSpent:number = 0;

  mesForm: FormGroup = new FormGroup({});
	chartOptions = {
	  animationEnabled: true,
	  exportEnabled: true,
	  data: [{
		  type: "doughnut", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [] as DataPoint[]
	  }]
	}
  categorias:any;
  constructor(private categoriasService:CategoriasService, private cdr:ChangeDetectorRef){

  }

  ngOnInit():void{
    this.mesForm = new FormGroup({
      mes: new FormControl('', Validators.required)
    });
    this.loadPorcentajes();
  }

  loadPorcentajes(){
    this.categoriasService.getPorcentajeMes(this.mesForm.value.mes).subscribe(
      (response)=>{
        const dataPoints:DataPoint[] = [];
        this.categorias = response.categories;
        this.totalSpent = response.totalSpent;
        response.categories.forEach((category:any)=>{
          if(category.percentage>0){
            dataPoints.push({name:category.categoryNombre, y: category.percentage});
          }
        },
      );
        console.log("DATAPOINTS",dataPoints);
        this.chartOptions.data[0].dataPoints=dataPoints;
        this.cdr.detectChanges();
      },
      (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          icon: 'error',
          title: 'Error Obteniendo Datos',
          text: error.error.message
        })
      }
    )
  }

  submit(){
    console.log(this.mesForm.value);
    this.loadPorcentajes();
  }
}                       