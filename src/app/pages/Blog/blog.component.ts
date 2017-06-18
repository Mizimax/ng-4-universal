import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FormControl} from '@angular/forms';

import { Article } from '../../models/Article';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { SharedService } from '../../services/shared.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'blog',
	templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {

  public Articles : Article[]
  public isLoading : Boolean = true
  public page : number = 1
  public totalPages : number
  public paginator : any[] = [1]
  public category : string = ''

  public searchWord : string = ''
  public searchCtrl = new FormControl();

  private pageSubs : Subscription
  private countSubs : Subscription
  private searchSubs : Subscription
  private limit : number = 9

  constructor(private http:TransferHttp, private shared:SharedService, private route: ActivatedRoute, private router: Router, private title: Title) {}

  ngOnInit() {

    this.title.setTitle('Articles - Mizimax.com')

    this.searchSubs = this.searchCtrl.valueChanges
                          .debounceTime(500)
                          .distinctUntilChanged()
                          .switchMap(
                            value => {
                              this.isLoading = true
                              if(this.pageSubs)
                                this.pageSubs.unsubscribe()
                              this.getTotalPage(value, this.category).then(count=>count.num/this.limit).then(count=>{
                                this.totalPages = count
                                this.paginator = this.setPaginator(this.page || 1, count)
                              })
                              return this.getPage(this.page,this.category,value).then(data=>{
                                return data
                              })
                            }
                          ).subscribe((data:Article[])=>{
                            this.isLoading = false
                            this.Articles = data
                          })

    this.route.queryParams.subscribe(queryParam=>{
      if(!queryParam.page){
        this.router.navigate(['blog'], { queryParams: { page : 1}})
      }else{   
        /* Setting variable */
        this.category = queryParam.category || ''
        this.page = Number(queryParam.page) || 1

        this.isLoading = true
        if(this.pageSubs)
          this.pageSubs.unsubscribe()

        this.getTotalPage().then(count=>count.num/this.limit).then(count=>{
          this.totalPages = count
          this.paginator = this.setPaginator(Number(queryParam.page) || 1, count)
          if(queryParam.page > Math.round(count))
              this.router.navigate(['blog'], { queryParams: { page : 1}})
        })
        this.getPage(Number(queryParam.page), queryParam.category).then(data=>{
          this.Articles = data
          this.isLoading = false
        })
      }
    })
  }

  setPaginator(page: number, total: number) : any[]{
    if(page > 4 && page < total-3){
      return [1,{txt:'...', value:page-3},page-2,page-1,page,page+1,page+2,{txt:'...', value:page+3},Math.round(this.totalPages)]
    }else if(page < 5){
      let myPage = []
      if(total>5){
        for(let i = 0; i < 5; i++)
          myPage[i] = i+1
        myPage.push({txt:'...', value:6})
        myPage.push(Math.round(this.totalPages))
      }else{
        for(let i = 0; i < total; i++)
          myPage[i] = i+1
      }
      return myPage
    }else{
      return [1,{txt:'...', value:total-5},total-4,total-3,total-2,total-1,total]
    }
  }

  getTotalPage(search?: string, category?: string) : Promise<any>{
    return new Promise((resolve,reject)=>{
      this.countSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs/count?search='+search+'&category='+category)
      .subscribe(count=>{
        resolve(count)
      }, err=>{
        reject(err)
      })
    })
  }

  getPage(page: number = 1, category? : string, search? : string) : Promise<Article[]>{
    return new Promise((resolve,reject)=>{
    this.pageSubs = this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit='+this.limit+'&offset='+((page-1)*this.limit)+'&search='+search+'&category='+category)
      .subscribe((data:Article[])=>{
        resolve(data)
      }, err=>{
        reject(err)
      })
    })
  }

  activeCategory(category): Boolean{
    return this.category!==category
  }

  modalOpen(): void{
    this.shared.set('post')
  }

  ngOnDestroy() {
    if(this.pageSubs)
      this.pageSubs.unsubscribe()
    if(this.countSubs)
      this.countSubs.unsubscribe()
    if(this.searchSubs)
      this.searchSubs.unsubscribe()
  }
}
