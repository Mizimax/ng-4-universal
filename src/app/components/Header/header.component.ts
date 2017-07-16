import { Component, ElementRef, OnInit } from '@angular/core';

import { Profile } from '../../models/Profile';

import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'max-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class HeaderComponent implements OnInit {

    public user : Profile = new Profile
    public navToggle : Boolean = false
    public dropdownOpen : Boolean = false
    public searchTxt: string

    constructor(private auth: AuthService, private shared: SharedService, private elem: ElementRef) { 
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

    onClick(event) {
        if (!this.elem.nativeElement.contains(event.target))
            this.dropdownOpen = false
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