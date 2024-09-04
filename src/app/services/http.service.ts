import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getSimulatedHttpRequest(): Observable<string> {
    return new Observable<string>((observer) => {
      const randomSuccess = Math.random() > 0.5; // 50% chance of success

      setTimeout(() => {
        if (randomSuccess) {
          observer.next('Data received successfully!');
          observer.complete();
        } else {
          observer.error('Network error occurred.');
        }
      }, 1000); // Simulate 1-second network latency
    }).pipe(
      tap({
        next: (val) => console.log('Initial request:', val),
        error: (err) => console.log('Error encountered:', err),
        complete: () => console.log('Request completed'),
      }),
      retry(3),
      tap(() => console.log('Retry attempt made')),
      catchError((error) => {
        console.error('Retries exhausted:', error);
        return of('Fallback data provided after retries.');
      }),
      tap((val) => console.log('Final response:', val))
    );
  }
}
