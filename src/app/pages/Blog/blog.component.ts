import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http'
import { SharedService } from '../../services/shared.service'

import { Article } from '../../models/Article'

import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

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

  private navTimeOut : any
  private limit : number = 9
  private subscriptions : object = {}

  constructor(
    private http:TransferHttp,
    private shared:SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    title.setTitle('Articles - Mizimax.com')
  }

  ngOnInit() {
    
    this.subscriptions['routeParams'] = this.route.queryParams.subscribe(queryParam=>{
      if(!queryParam.page){
        /* If no default page */
        this.router.navigate(['blog'], { queryParams: { page : 1}})
      }else{   
        /* Setting variable */
        this.category = queryParam.category || ''
        this.page = Number(queryParam.page) || 1
        this.searchWord = queryParam.search || ''
        this.isLoading = true

        /* Clear http subscription */
        if(this.subscriptions['getArticle'])
          this.subscriptions['getArticle'].unsubscribe()
        if(this.subscriptions['getCountArticle'])
          this.subscriptions['getCountArticle'].unsubscribe()
        
        /* Load articles */
        this.subscriptions['getArticle'] = this.getArticle(this.page, this.category, this.searchWord).subscribe(data=>{
          this.Articles = data
          this.isLoading = false
        })

        /* Get count of articles */
        this.subscriptions['getCountArticle'] = this.getCountArticle(this.searchWord, this.category).map(count=>count.num/this.limit).subscribe(count=>{
          this.totalPages = count
          this.paginator = this.setPaginator(this.page, count)
          if(this.page > Math.ceil(count) && this.Articles.length >= 1)
              this.router.navigate(['blog'], { queryParams: { page : 1}})
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

  getCountArticle(search?: string, category?: string) : Observable<any>{
    const url = 'https://maxangeiei.herokuapp.com/api/v1/blogs/count?search='+search+'&category='+category
    return this.http.get(url)
  }

  getArticle(page: number = 1, category? : string , search? : string) : Observable<Article[]>{
    const url = 'https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit='+this.limit+'&offset='+((page-1)*this.limit)+'&search='+search+'&category='+category
    return this.http.get(url)
  }

  search(){
    this.router.navigate(['blog'],{ queryParams: { search: this.searchWord, page: 1}})
  }

  searchChange(){
    if(this.navTimeOut)
      clearTimeout(this.navTimeOut)
    this.navTimeOut = setTimeout(()=>this.search(), 500)
  }

  activeCategory(category): Boolean{
    return this.category!==category
  }

  open(){
    this.shared.set('post')
  }

  ngOnDestroy() {
    Object.keys(this.subscriptions).forEach(subs=>{
      this.subscriptions[subs].unsubscribe()
    })
  }
}
