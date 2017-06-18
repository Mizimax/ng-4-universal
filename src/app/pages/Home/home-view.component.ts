import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { Title } from '@angular/platform-browser';

import { Article } from '../../models/Article';

@Component({
	selector: 'home-view',
	templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeView implements OnInit {
  private lastSubs : any
  public lastArticles : Article[]
  public isLoading: Boolean = true

  constructor(private http:TransferHttp, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Mizimax')
		this.lastSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit=3')
		  .subscribe((data:Article[])=>{
			this.lastArticles = data
			this.isLoading = false
		  })
  }
  ngOnDestroy() {
    if(this.lastSubs)
      this.lastSubs.unsubscribe()
  }
}
