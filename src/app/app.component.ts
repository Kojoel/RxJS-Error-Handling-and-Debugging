import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RxJS-Error-Handling-and-Debugging';

  response: string | null = null;
  loading: boolean = false;

  getSimulatedHttpRequest(): Observable<string> {
    return new Observable<string>((observer) => {
      const randomSuccess = Math.random() > 0.3;
  
      setTimeout(() => {
        if (randomSuccess) {
          observer.next('Data received successfully!');
          observer.complete();
        } else {
          observer.error('Network error occurred.');
        }
      }, 1000);
    }).pipe(
      tap({
        next: (val) => console.log('Initial request:', val),
        error: (err) => console.log('Error encountered:', err),
        complete: () => console.log('Request completed')
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
  
  makeHttpRequest() {
    this.loading = true;
    this.getSimulatedHttpRequest().subscribe({
      next: (res) => {
        this.response = res;
        this.loading = false;
      },
      error: (err) => {
        this.response = `Request failed: ${err}`;
        this.loading = false;
      }
    });
  }
}
