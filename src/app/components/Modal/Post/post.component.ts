import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';
import { TransferHttp } from '../../../../modules/transfer-http/transfer-http';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    public isLoading : Boolean = false

    private postSubs: Subscription

    constructor(private http:TransferHttp, private auth: AuthService, private shared: SharedService) { }

    ngOnInit() {
        this.auth.fetchUser()
    }

    onSubmit(form : any){
        this.postSubs = this.http.post('https://maxangeiei.herokuapp.com/api/v1/blogs?token='+this.auth.getToken().token, form)
            .subscribe(data=>{
                this.isLoading = false
                this.shared.set('modalClose')
            })
    }

    ngOnDestroy() {
        if(this.postSubs)
            this.postSubs.unsubscribe()
    }
}