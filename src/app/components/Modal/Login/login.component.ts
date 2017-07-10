import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TransferHttp } from '../../../../modules/transfer-http/transfer-http';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Output() event = new EventEmitter();

    public isLoading : Boolean = false
    public authLoading : Boolean = false
    public errMsg: String = ''
    private loginSubs: Subscription

    constructor(private http:TransferHttp, private auth: AuthService, private shared: SharedService) { }

    ngOnInit() {
        this.authLoading = true
        this.auth.fetchUser().then(data=>{
            this.auth.deleteToken()
            this.shared.set('modalClose')
        }).catch(err=>{
            this.event.emit()
            this.authLoading = false
        })
    }

    onSubmit(form : any){
        this.loginSubs = this.http.post('https://maxangeiei.herokuapp.com/api/v1/user/login', form).subscribe(data=>{
            this.auth.setToken(data.user, data.token).then(()=>{
                this.isLoading = false
                this.shared.set('modalClose')
                this.auth.fetchUser()
            })
        },err=>{
            this.errMsg = err.json().error
            this.isLoading = false
        })
    }

    ngOnDestroy() {
        if(this.loginSubs)
            this.loginSubs.unsubscribe()
    }
}