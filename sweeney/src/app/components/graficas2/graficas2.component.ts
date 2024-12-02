import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'graficas2',
    templateUrl: './graficas2.component.html',
    standalone: true,
    imports: [ChartModule, SidebarComponent]
})
export class Graficas2Component implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['Comida', 'Bebida', 'Cigarrillos'],
            datasets: [
                {
                    data: [8, 23, 15],
                    backgroundColor: ["#e2e2e2", "#f98729", "#000000"],
                    hoverBackgroundColor: ["#e2e2e2", "#f98729", "#000000"]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    loadData(){
       
    }
}