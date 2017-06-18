import { SharedService } from '../../services/shared.service';
import { Profile } from '../../models/Profile';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'max-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public user : Profile = new Profile
    public navToggle : Boolean = false
    public isLoading: Boolean = false
    constructor(private auth: AuthService, private shared: SharedService) { 
    }
    modalOpen(){
        this.isLoading = true
        this.auth.fetchUser().then(data=>{
            this.isLoading = false
            this.auth.deleteToken().then(()=>{ 
                this.auth.fetchUser()
            })
        }).catch(err=>{
            this.isLoading = false
            this.shared.set('login')
        })

    }
    ngOnInit() {
        this.auth.getUser().subscribe((user:Profile)=>{
            if(user !== null)
                this.user = user
            else
                this.user = new Profile
        })
     }
}