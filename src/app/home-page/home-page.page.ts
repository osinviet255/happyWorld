import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {

  constructor(private router: Router) { }

  gotoDetail(){
    this.router.navigateByUrl('news');
  }

  gioithieu(){
    this.router.navigateByUrl('tabs/gioithieu');
  }

}
