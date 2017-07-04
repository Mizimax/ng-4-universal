import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Title, Meta } from '@angular/platform-browser'

import { Subscription } from 'rxjs/Rx'
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

    private subscriptions : Subscription = new Subscription()

    constructor(
        private http: TransferHttp,
        private route:ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) { }

    ngOnInit() { 
        this.subscriptions.add(
            this.route.params.subscribe(param=>{
                this.isLoading = true
                this.topic.next(param.name)
                this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+param.name)
                    .subscribe((data:Article)=>{
                        this.isLoading = false
                        this.tag.next(data.tags)
                        this.article = data
                        this.title.setTitle(data.topic+' - Mizimax.com')
                        this.meta.updateTag({ name: 'description', content: data.topic+' - Mizimax.com' });
                        this.meta.updateTag({ name: 'keywords', content: data.tags || ' ' });
                    })
            })
        )
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}
