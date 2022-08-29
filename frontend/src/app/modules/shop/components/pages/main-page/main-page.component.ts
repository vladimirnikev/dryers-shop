import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private store: Store) {}
}
