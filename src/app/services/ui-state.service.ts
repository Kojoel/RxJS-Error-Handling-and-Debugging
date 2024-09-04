import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private responseSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  response$ = this.responseSubject.asObservable();

  setLoadingState(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  setResponse(response: string | null): void {
    this.responseSubject.next(response);
  }
}
