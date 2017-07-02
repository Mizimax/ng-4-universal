import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Article } from '../../models/Article'

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'max-side-article',
    templateUrl: './side-article.component.html',
    styleUrls: ['./side-article.component.css']
})
export class SideArticleComponent implements OnInit {

    public latestArticles: Article[]
    public relatedArticles: Article[]

    private latestSubs: Subscription
    private relatedSubs: Subscription
    private sharedSubs: Subscription

    constructor(private http: TransferHttp, private shared: SharedService) { 
    }
    ngOnInit() {
        this.sharedSubs = this.shared.get().subscribe(val=>{
            if(val.state === 'sideArticleLoad')
                this.loadSideArticle(val.tag)
        })
    }
    loadSideArticle(tag){
        if(typeof window !== 'undefined'){
            this.latestSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit=3')
              .subscribe((data:Article[])=>{
                this.latestArticles = data
              })
            this.relatedSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?tag='+ tag +'&limit=3')
              .subscribe((data:Article[])=>{
                this.relatedArticles = data
              })
        }
    }
    ngOnDestroy() {
        this.sharedSubs.unsubscribe()
        if(this.latestSubs)
            this.latestSubs.unsubscribe()
        if(this.relatedSubs)
            this.relatedSubs.unsubscribe()
    }
}