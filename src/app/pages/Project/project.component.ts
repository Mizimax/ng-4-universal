import { Title } from '@angular/platform-browser';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'project',
	templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  constructor(private title: Title) {}

  @ViewChild('el1') el1:ElementRef;
  @ViewChild('el2') el2:ElementRef;
  @ViewChild('el3') el3:ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    let scrollTop = event.target.scrollingElement.scrollTop
    if(scrollTop > 70 && this.el2.nativeElement.children[0].classList.contains('is-hidden')){
      this.el2.nativeElement.children[0].classList.remove('is-hidden')
      this.el2.nativeElement.children[0].classList.add('bounce-in')
      this.el2.nativeElement.children[1].classList.remove('is-hidden')
      this.el2.nativeElement.children[1].classList.add('bounce-in')
    }else if(scrollTop > 270 && this.el3.nativeElement.children[0].classList.contains('is-hidden')){
      this.el3.nativeElement.children[0].classList.remove('is-hidden')
      this.el3.nativeElement.children[0].classList.add('bounce-in')
      this.el3.nativeElement.children[1].classList.remove('is-hidden')
      this.el3.nativeElement.children[1].classList.add('bounce-in')
    }
  }
  ngOnInit() {
    this.title.setTitle('Experience - Mizimax.com')
    if(typeof window !== 'undefined'){
      this.el1.nativeElement.children[0].classList.remove('is-hidden')
      this.el1.nativeElement.children[0].classList.add('bounce-in')
      this.el1.nativeElement.children[1].classList.remove('is-hidden')
      this.el1.nativeElement.children[1].classList.add('bounce-in')
    }
  }
}
