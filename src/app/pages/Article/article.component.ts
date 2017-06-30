import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { Article } from '../../models/Article';
import { Comment } from '../../models/Article';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    public isLoading: Boolean = true
    public article: Article = new Article()
    public comments: Comment[]

    private captchaResponse: any

    private articleSubs : Subscription
    private paramSubs: Subscription
    private commentSubs: Subscription
    private addCommentSubs: Subscription

    constructor(private http: TransferHttp, private route:ActivatedRoute, private title: Title, private auth: AuthService) { 
    }

    ngOnInit() { 
        if(typeof window !== 'undefined'){
            window['verifyCallback'] = this.verifyCallback.bind(this);
            this.render()
        }
        this.paramSubs = this.route.params.subscribe(param=>{

            this.articleSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+param.name)
                .subscribe((data:Article)=>{
                    this.article = data
                    this.article.name = param.name
                    this.isLoading = false
                    this.title.setTitle(data.topic+' - Mizimax.com')
                })
            this.commentSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+param.name+'/comments')
                .subscribe((data:any)=>{
                    this.comments = data
                })
        })
    }

    addComment(form): void{
        this.addCommentSubs = this.http.post('https://maxangeiei.herokuapp.com/api/v1/blog/'+this.article.name+'/comments'
                                        , {comment: form.commentText, created_by: this.auth.getLastUser().name, captcha: this.captchaResponse})
                                       .subscribe(data=>{
                                            this.comments.push({
                                                comment: form.commentText,
                                                created_by: this.auth.getLastUser().name,
                                                created_at: new Date(),
                                                updated_at: new Date()
                                            });
                                            (<any>window).grecaptcha.reset()
                                       })
    }

    render(){
        let doc = <HTMLDivElement>document.getElementById('submit');
        let script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    }


    verifyCallback(response){
        this.captchaResponse = response
    }

    ngOnDestroy() {
        this.paramSubs.unsubscribe()
        this.articleSubs.unsubscribe()
        this.commentSubs.unsubscribe()
        if(this.addCommentSubs)
            this.addCommentSubs.unsubscribe()
    }
}