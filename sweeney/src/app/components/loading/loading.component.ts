import { Component, ContentChild, OnInit, TemplateRef, Input, inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe, NgIf, NgTemplateOutlet],
  //templateUrl: './loading.component.html',
  //styleUrl: './loading.component.css',
  template: `@if (isLoading()) {
          <div class="overlay">
            <div class="flex justify-center items-center min-h-screen">
            <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"></div>
        </div>
    </div>}`

})
export class LoadingComponent{
  private readonly loadingSrv = inject(LoadingService);
  isLoading = this.loadingSrv.isLoading;
}
