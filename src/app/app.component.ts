import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpService } from './services/http.service';
import { UiStateService } from './services/ui-state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RxJS-Error-Handling-and-Debugging';

  loading$ = this.uiStateService.loading$;
  response$ = this.uiStateService.response$;
  error$ = this.uiStateService.error$;

  constructor(
    private httpService: HttpService,
    private uiStateService: UiStateService
    
  ) {}


  makeHttpRequest(): void {
    this.uiStateService.setLoadingState(true);
    this.uiStateService.setError(null); // Reset previous errors
    this.uiStateService.setResponse(null); // Reset previous responses

    this.httpService.getSimulatedHttpRequest().subscribe({
      next: (res) => {
        this.uiStateService.setResponse(res); // Set response for successful request
        this.uiStateService.setLoadingState(false);
      },
      error: (err) => {
        this.uiStateService.setError(`Request failed: ${err}`); // Set error message
        this.uiStateService.setLoadingState(false);
      },
    });
  }


  // makeHttpRequest(): void {
  //   this.uiStateService.setLoadingState(true);
  //   this.httpService.getSimulatedHttpRequest().subscribe({
  //     next: (res) => {
  //       this.uiStateService.setResponse(res);
  //       this.uiStateService.setLoadingState(false);
  //     },
  //     error: (err) => {
  //       this.uiStateService.setLoadingState(false);
  //       this.uiStateService.setError(`Request failed: ${err}`);
  //     },
  //   });
  // }
}
