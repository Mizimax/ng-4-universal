import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { TransferHttp } from '../../../modules/transfer-http/transfer-http'
import { SharedService } from '../../services/shared.service'

import { Article } from '../../models/Article'

@Component({
    selector: 'max-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

    public isLoading: Boolean = true
    public article: Article = new Article()

    public tag = new BehaviorSubject<string>('')
    public topic = new BehaviorSubject<string>('')

    private subscriptions : Array<Subscription> = []

    constructor(
        private http: TransferHttp,
        private route:ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) { }

    ngOnInit() {
        this.subscriptions['params'] = 
            this.route.params.subscribe(param=>{
                this.isLoading = true
                this.topic.next(param.name)
                this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+param.name)
                    .subscribe((data:Article)=>{
                        this.isLoading = false
                        this.article = data
                        if(typeof window !== 'undefined'){
                            this.tag.next(data.tags)
                            this.sharedRender()
                        }
                        this.title.setTitle(data.topic+' - Mizimax.com')
                        this.meta.updateTag({ name: 'description', content: data.topic })
                        this.meta.updateTag({ name: 'keywords', content: data.tags || ' ' })
                        this.meta.updateTag({ name: 'og:url', content: 'https://mizimax.com/blog/'+param.name })
                        this.meta.updateTag({ name: 'og:type', content: 'website' })
                        this.meta.updateTag({ name: 'og:title', content: data.topic })
                        this.meta.updateTag({ name: 'og:description', content: data.sub_title })
                        this.meta.updateTag({ name: 'og:image', content: 'https://mizimax.com/static/imgs/'+data.pic })
                    })
            })
    }

    sharedRender(){
        (<any>window).addthis.layers.refresh()
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subs=>{
            subs.unsubscribe()
        })
    }
}
