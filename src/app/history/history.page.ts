import { Entities } from 'src/app/entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { NavController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {

  currentDay: any;
  fromDate: any;
  toDate: any;
  dDateStart: any;
  dDateEnd: any;
  today: Date;
  previousMonth: Date;
  dFromDay: any;
  lstHistory: [];
  searchValue: any;
  pageIndex: number = 0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private nav: NavController,
    private ctl: Controller,
    private glb: Entities,
    private loadingNotif: LoadingController) { }

  async ionViewWillEnter(){
    this.today = new Date();
    this.previousMonth = new Date();
    this.previousMonth.setDate(this.previousMonth.getDate() - 30);
    console.log(this.previousMonth);
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.today.getFullYear();
    this.currentDay = mm + '/' + dd + '/' + yyyy;
    this.dDateStart = String(this.previousMonth.getMonth() + 1).padStart(2, '0') + "/" + String(this.previousMonth.getDate()).padStart(2, '0') + "/" + this.previousMonth.getFullYear();
    this.dFromDay = this.dDateStart;
    this.dDateEnd = this.currentDay; 
    this.dDateStart = new Date(this.dFromDay + " 00:00:00").getTime();
    this.dDateEnd = new Date(this.dDateEnd + " 23:59:59").getTime();
    console.log(this.dDateStart);
    console.log(this.dDateEnd);
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.glb.setloadingNotif(loading);
    this.ctl.GetListTransHistory(this.searchValue,this.dDateStart, this.dDateEnd, this.pageIndex).then(() => {
      this.lstHistory = this.glb.getLstData();      
      loading.dismiss();
    });
  }
  goBack() {
    this.nav.pop();
  }
  async handleSearch(){
    this.pageIndex = 0;
    this.dDateStart = new Date(this.fromDate).getTime();
    let dToDate = new Date(this.toDate);
    dToDate.setDate(dToDate.getDate() + 1);
    this.dDateEnd = dToDate.getTime();
    console.log(this.dDateStart);
    console.log(this.dDateEnd);
    console.log(this.searchValue);
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.glb.setloadingNotif(loading);
    this.ctl.GetListTransHistory(this.searchValue, this.dDateStart, this.dDateEnd, this.pageIndex).then(() => {
      this.lstHistory = this.glb.getLstData();
      loading.dismiss();
      this.toggleInfiniteScroll();
    });
  }

  async loadMoreData(event){
    this.pageIndex = this.pageIndex + 1;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.ctl.GetListTransHistory(this.searchValue, this.dDateStart, this.dDateEnd, this.pageIndex).then(() => {
      if(this.glb.getLstData().length === 0){
        event.target.disabled = true;
      }
      else{
        for(let i =0; i < this.glb.getLstData().length; i++){
          this.lstHistory.push(this.glb.getLstData()[i]);
        }
        event.target.complete();
      }
      
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
