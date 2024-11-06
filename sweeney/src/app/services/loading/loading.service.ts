import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = signal<boolean>(false);
  public hide(){
    this.isLoading.set(false);
  }
  public show(){
    this.isLoading.set(true);
  }
}
