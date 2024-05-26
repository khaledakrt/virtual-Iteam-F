import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {
showScroll:boolean;
showScrollHeight = 400;
hideScrollHeight = 400;
constructor(){
}

@HostListener('window:scroll', [])
@HostListener('window:scroll', [])
onWindowScroll() {
  if (
    window.scrollY > this.showScrollHeight ||
    document.documentElement.scrollTop > this.showScrollHeight ||
    document.body.scrollTop > this.showScrollHeight
  ) {
    this.showScroll = true;
  } else if (this.showScroll &&
    (window.scrollY < this.hideScrollHeight ||
      document.documentElement.scrollTop < this.hideScrollHeight ||
      document.body.scrollTop < this.hideScrollHeight)
  ) {
    this.showScroll = false;
  }
}


ngOnInit() {
}

scrollToTop() {
  (function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
}
}