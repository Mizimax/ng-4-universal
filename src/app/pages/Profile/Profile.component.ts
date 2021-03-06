import { Component, OnDestroy, OnInit } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from "rxjs/Subscription";

import { AuthService } from '../../services/auth.service';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { SharedService } from '../../services/shared.service';

import { Profile } from '../../models/Profile';

@Component({
	selector: 'max-profile',
	templateUrl: './Profile.component.html',
	styleUrls: ['./Profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {

	public userProfile : Profile = new Profile()

	public itsMe: Boolean = false

	private subscriptions : Array<Subscription> = []

	constructor(
		private auth: AuthService,
		private http: TransferHttp,
		private router: Router,
		private route: ActivatedRoute,
		private shared: SharedService 
	) {}

	ngOnInit() {
		this.subscriptions['userProfile'] = 
			this.route.params.subscribe(param=>{
				if(param.name === 'me'){
					this.itsMe = true
					if(typeof window !== 'undefined'){
						if(!this.auth.getLastUser().email){
							this.auth.fetchUser().then((user: Profile)=>{
								this.userProfile = user
							}, err=>{
								this.router.navigate(['/'])
							})
						}
						else{
							this.userProfile = this.auth.getLastUser()
						}
					}
				}else{
					if(typeof window !== 'undefined'){
						try{			
							let name = JSON.parse(localStorage.getItem('currentUser')).name
						}catch(e){
							console.log(e)
						}
						if(param.name === name){
							
						}else{
							let url = 'https://maxangeiei.herokuapp.com/api/v1/user/' + param.name
							this.http.get(url).subscribe((data: Profile)=>{
								this.userProfile = data
							},err=>{
								this.router.navigate(['/'])
							})
						}
					}
				}
			})
	}

	logout(){
		this.auth.deleteToken().then(()=>{
			this.auth.fetchUser()
			this.router.navigate(['/'])
		})
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subs=>{
            subs.unsubscribe()
        })
	}
}