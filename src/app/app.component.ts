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

  constructor(
    private httpService: HttpService,
    private uiStateService: UiStateService
  ) {}

  makeHttpRequest(): void {
    this.uiStateService.setLoadingState(true);
    this.httpService.getSimulatedHttpRequest().subscribe({
      next: (res) => {
        this.uiStateService.setResponse(res);
        this.uiStateService.setLoadingState(false);
      },
      error: (err) => {
        this.uiStateService.setResponse(`Request failed: ${err}`);
        this.uiStateService.setLoadingState(false);
      },
    });
  }
}
