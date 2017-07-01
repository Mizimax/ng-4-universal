import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Article } from '../../models/Article'

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';

@Component({
    selector: 'max-side-article',
    templateUrl: './side-article.component.html',
    styleUrls: ['./side-article.component.css']
})
export class SideArticleComponent implements OnInit {

    @Input() tag: string

    public latestArticles: Article[]
    public relatedArticles: Article[]

    private latestSubs: Subscription
    private relatedSubs: Subscription

    constructor(private http: TransferHttp) { 
    }
    ngOnInit() {
        this.latestSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit=3')
		  .subscribe((data:Article[])=>{
			this.latestArticles = data
		  })
        this.relatedSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?tag='+ this.tag +'&limit=3')
		  .subscribe((data:Article[])=>{
			this.relatedArticles = data
		  })
    }
    ngOnDestroy() {
        
    }
}