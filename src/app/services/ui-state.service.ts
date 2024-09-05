import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private responseSubject = new BehaviorSubject<string | null>(null);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  response$ = this.responseSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  setLoadingState(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  setResponse(response: string | null): void {
    this.responseSubject.next(response);
  }

  setError(error: string | null): void {
    this.errorSubject.next(error);
  }
  
}
