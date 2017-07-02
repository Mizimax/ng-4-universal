import { Component, OnInit, ViewChild } from '@angular/core';

import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'max-side-nav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {

    @ViewChild('sidenav') sidenav;

    public isOpened: boolean = false

    constructor(private shared: SharedService) { 
    }
    ngOnInit() {
        this.shared.get().subscribe(val=>{
            if(val.state === 'sidenav' && val.val === true){
              this.sidenav.nativeElement.style.width = '230px'
              this.isOpened = true
            }
            else if(val.state === 'sidenav' && val.val === false){
              this.sidenav.nativeElement.style.width = '0px'
              this.isOpened = false
            }
        })
    }
    cancel(){
        this.shared.set({ state: 'sidenav', val: false })
        this.isOpened = false
    }
}