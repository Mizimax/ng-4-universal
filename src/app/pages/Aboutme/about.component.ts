import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'about-view',
	templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutView implements OnInit {
  constructor(private title: Title) {
  }
  ngOnInit() {
    this.title.setTitle('About - Mizimax.com')
  }
}
