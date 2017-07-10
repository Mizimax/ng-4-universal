import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Rx';

import { Article } from '../../models/Article';

import { TransferHttp } from '../../../modules/transfer-http/transfer-http';

@Component({
	selector: 'home-view',
	templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeView implements OnInit {

  public animation: Boolean = false

  public latestArticles : Article[]
  public isLoading: Boolean = true

  constructor(private http: TransferHttp, private title: Title, private meta: Meta) {
    title.setTitle('Mizimax')
    meta.updateTag({ name: 'description', content: 'Mizimax แบ่งปันความรู้และเทคนิคง่ายๆในการเขียนโปรแกรม อัปเดทเทคโนโลยีใหม่ๆ web, mobile app และอื่นๆเกี่ยวกับการเขียนโปรแกรม' });
    meta.updateTag({ name: 'keywords', content: 'mizimax, maxang, แม็กซ์เอง, web, programming, technology' });
    meta.updateTag({ name: 'og:url', content: 'https://mizimax.com' })
    meta.updateTag({ name: 'og:type', content: 'website' })
    meta.updateTag({ name: 'og:title', content: 'Mizimax' })
    meta.updateTag({ name: 'og:description', content: 'แบ่งปันความรู้และเทคนิคง่ายๆในการเขียนโปรแกรม อัปเดทเทคโนโลยีใหม่ๆ web, mobile app และอื่นๆเกี่ยวกับการเขียนโปรแกรม' })
    meta.updateTag({ name: 'og:image', content: 'https://mizimax.com/static/imgs/header.jpg' })
  }

  ngOnInit() {
    this.http.get('https://maxangeiei.herokuapp.com/api/v1/blogs?sort=-$natural&limit=4')
      .subscribe((data:Article[])=>{
        this.latestArticles = data
        this.isLoading = false
      })
  }

  ngOnDestroy() {
    
  }
}
