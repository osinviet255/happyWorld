import { NavController } from '@ionic/angular';
import { Entities } from './../../entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.page.html',
  styleUrls: ['./list-news.page.scss'],
})
export class ListNewsPage {

  sub: any;
  categoryId: any;
  pageIndex: any = 0;
  lstData: [];
  titleSearch: any;
  constructor(private route: ActivatedRoute,
    private ctl: Controller,
    private glb: Entities,
    private nav: NavController,
    private router: Router) { 

    this.sub = this.route.params.subscribe(param => {
      this.categoryId = param['catId'];
      console.log("CategoryId: " + this.categoryId);
      this.ctl.searchNewsByCatId(this.titleSearch, this.categoryId, this.pageIndex, 10).then(() => {
        this.lstData = this.glb.getLstData();
        if(this.lstData.length === 0){
          this.ctl.displayAlert("Không có dữ liệu. Vui lòng quay lại sau.");
        }
      });
    });
  }

  goback() {
    this.nav.pop();
  }

  goToDetail(id){
    this.ctl.getNewsById(id).then(() => {
      this.router.navigate(['news']);
    });
  }

  async loadMoreData(event){
    this.pageIndex = this.pageIndex + 1;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.ctl.searchNewsByCatId(this.titleSearch, this.categoryId, this.pageIndex, 10).then(() => {
      if(this.glb.getLstData().length === 0){
        event.target.disabled = true;
      }
      else{
        for(let i =0; i < this.glb.getLstData().length; i++){
          this.lstData.push(this.glb.getLstData()[i]);
        }
        event.target.complete();
      }
      
    });
  }

  searchNews(){
    this.pageIndex = 0;
    this.ctl.searchNewsByCatId(this.titleSearch, this.categoryId, this.pageIndex, 10).then(() => {
      this.lstData = this.glb.getLstData();
    });
  }

}
