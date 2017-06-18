import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { TransferState } from '../modules/transfer-state/transfer-state';

@Component({
	selector: 'max-app',
	template: `
	  <max-header></max-header>
    <router-outlet></router-outlet>
    <max-modal></max-modal>
	`,
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  constructor(private cache: TransferState) {}
  ngOnInit() {
    this.cache.set('cached', true);
  }
}
