import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Profile } from '../models/Profile';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {
    private subs : any
    private token : any = ''
    private userData: BehaviorSubject <Profile> = new BehaviorSubject <Profile>(null)
    constructor(private http: Http){}
    fetchUser(){
        if (typeof window !== 'undefined'){
            return new Promise((resolve,reject)=>{
            this.subs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/user/me?token='+this.getToken().token)
                                .map(data=>data.json())
                                .catch(error=> Observable.throw(error.json()))
                                .subscribe(data=>{
                                        this.userData.next(data)
                                        resolve(data)
                                    },err=>{
                                        this.userData.next(null)
                                        reject(err)
                                })
            })
        }
    }
    getUser() : Observable<any> {
        return this.userData.asObservable();
    }
    getLastUser() : Profile
    {
        return this.userData.getValue() || new Profile()
    }
    getToken(){
        if (typeof window !== 'undefined'){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        return currentUser || ''
    }
    setToken(user, token){
        return new Promise((resolve)=>{
            if (typeof window !== 'undefined')
                localStorage.setItem('currentUser', JSON.stringify({ name: user, token: token }));
            resolve()
        })
    }
    deleteToken(){
        return new Promise((resolve)=>{
            if (typeof window !== 'undefined')
                localStorage.removeItem('currentUser')
            resolve()
        })
    }
}