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
    public dropdownOpen : Boolean = false
    public searchTxt: string

    constructor(private auth: AuthService, private shared: SharedService) { 
    }
    ngOnInit() {
        this.auth.getUser().subscribe((user:Profile)=>{
            if(user !== null)
                this.user = user
            else
                this.user = new Profile
        })
        this.shared.get().subscribe(val=>{
            if(val.state === 'sidenav' && val.val === false){
              this.navToggle = false
            }
        })
     }
    modalOpen(){
        this.shared.set('login')
    }
    toggle(){
        this.navToggle = !this.navToggle
        this.shared.set({ state: 'sidenav', val: this.navToggle })
    }
    dropdownToggle(){
        this.dropdownOpen = !this.dropdownOpen
    }
}