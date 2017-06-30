import { Component, OnInit, Input } from '@angular/core';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { AuthService } from '../../services/auth.service';

import { Comment } from '../../models/Article';

import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'max-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

	@Input() topic: string

	public comments: Comment[]

    private captchaResponse: any

	private commentSubs: Subscription
    private addCommentSubs: Subscription

    constructor(private http: TransferHttp, private auth: AuthService) { 
    }
    ngOnInit() {
        if(typeof window !== 'undefined'){
            window['verifyCallback'] = this.verifyCallback.bind(this);
            this.render()
        }
        this.commentSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+this.topic+'/comments')
                .subscribe((data:any)=>{
                    this.comments = data
                })
    }
    addComment(form): void{
        this.addCommentSubs = this.http.post('https://maxangeiei.herokuapp.com/api/v1/blog/'+this.topic+'/comments'
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
        let doc = <HTMLDivElement>document.getElementById('submit')
        let script = document.createElement('script')
        script.src = 'https://www.google.com/recaptcha/api.js'
        script.async = true
        script.defer = true
        doc.appendChild(script)
    }


    verifyCallback(response){
        this.captchaResponse = response
    }

    ngOnDestroy(){
    	this.commentSubs.unsubscribe()
        if(this.addCommentSubs)
            this.addCommentSubs.unsubscribe()
    } 
}