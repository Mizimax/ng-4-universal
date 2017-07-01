import { Subject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

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