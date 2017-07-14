import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { TransferHttp } from '../../../modules/transfer-http/transfer-http'
import { AuthService } from '../../services/auth.service'

import { Comment } from '../../models/Article'

import pell from 'pell'

@Component({
    selector: 'max-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

    @Input() topic: BehaviorSubject<string>

	public comments: Comment[]

    private captchaResponse: any

	private subscriptions: Subscription = new Subscription()

    constructor(
        private http: TransferHttp,
        private auth: AuthService
    ) { }

    ngOnInit() {
    	pell.init(({
		  root: 'pell'
		}))
        if(typeof window !== 'undefined'){
            window['verifyCallback'] = this.verifyCallback.bind(this);
            this.render()
        }
        this.subscriptions.add(
            this.topic.subscribe(val=>{
                this.loadComment(val)
            })
        )
    }

    loadComment(topic){
        this.http.get('https://maxangeiei.herokuapp.com/api/v1/blog/'+topic+'/comments')
            .subscribe(data=>{
                this.comments = data
            })
    }

    addComment(): void{
    	let formText = document.getElementsByClassName('pell-editor')[0].innerHTML
        let url = 'https://maxangeiei.herokuapp.com/api/v1/blog/'+this.topic.getValue()+'/comments';
        let data = { comment: formText,
                     created_by: this.auth.getLastUser().name,
                     captcha: this.captchaResponse }

        this.http.post(url, data)
           .subscribe(data=>{
                this.comments.push({
                    comment: formText,
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
        this.subscriptions.unsubscribe()
    } 
}