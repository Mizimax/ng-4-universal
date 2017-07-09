import { Component, Input, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { TransferHttp } from '../../../modules/transfer-http/transfer-http'
import { SharedService } from '../../services/shared.service'

import { Article } from '../../models/Article'

@Component({
    selector: 'max-side-article',
    templateUrl: './side-article.component.html',
    styleUrls: ['./side-article.component.css']
})
export class SideArticleComponent implements OnInit, OnDestroy {

    @Input() tag: BehaviorSubject<string>

    /* Show data */
    public latestArticles: Article[]
    public relatedArticles: Article[]

    private subscriptions: Subscription = new Subscription()

    constructor(private http: TransferHttp, private shared: SharedService) { 
    }
    ngOnInit() {
        this.subscriptions.add(
            this.tag.subscribe(val=>{
                this.loadSideArticle(val)
            })
        )
    }
    loadSideArticle(tag){
        this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit=3')
          .subscribe((data:Article[])=>{
            this.latestArticles = data
          })
        this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?tag='+ tag +'&limit=3')
          .subscribe((data:Article[])=>{
            this.relatedArticles = data
          })
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}