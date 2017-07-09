import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

@Injectable()
export class SharedService {
    private shared: Subject<any> = new Subject<any>()
    set(value) : void{
        this.shared.next(value)
    }
    get() : Observable<any> {
        return this.shared.asObservable();
    }
}