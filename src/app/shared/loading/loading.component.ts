import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent{
    @Input('height') height: string
    @Input('size') size: string
    @Input('text') text: string
    constructor(){
    }
}