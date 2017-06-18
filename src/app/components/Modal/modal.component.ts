import { SharedService } from '../../services/shared.service';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service'

@Component({
    selector: 'max-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    public isOpened: Boolean = false
    public event: String

    private sharedSubs: any

    constructor(private shared: SharedService) { 
    }
    ngOnInit() {
        this.sharedSubs = this.shared.get().subscribe(data=>{
            if(data==='login'){
                this.isOpened = true
                this.event = data
            }else if(data==='regis'){
                this.isOpened = true
                this.event = data
            }else if(data==='post'){
                this.isOpened = true
                this.event = data
            }else if(data==='modalClose'){
                this.isOpened = false
            }
            
        })
    }
    ngOnDestroy(){
        if(this.sharedSubs)
            this.sharedSubs.unsubscribe()
    }
}