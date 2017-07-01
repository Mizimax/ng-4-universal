import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
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
  constructor(private cache: TransferState, private router: Router) {}
  ngOnInit() {
    this.cache.set('cached', true);
    this.router.events.subscribe((val) => {
        if(typeof window !== 'undefined' && val.url.indexOf('category') === -1)
          window.scrollTo(0, 0)
    });
  }
}
