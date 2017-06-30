import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { Article } from '../../models/Article';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    public isLoading: Boolean = true
    public article: Article = new Article()

    private articleSubs : Subscription
    private paramSubs: Subscription
    

    constructor(private http: TransferHttp, private route:ActivatedRoute, private title: Title) { 
    }

    ngOnInit() { 
        this.paramSubs = this.route.params.subscribe(param=>{
            this.article.name = param.name
            this.articleSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+param.name)
                .subscribe((data:Article)=>{
                    this.article = data
                    this.article.name = param.name
                    this.isLoading = false
                    this.title.setTitle(data.topic+' - Mizimax.com')
                })
        })
    }
    ngOnDestroy() {
        this.paramSubs.unsubscribe()
        this.articleSubs.unsubscribe()
    }
}