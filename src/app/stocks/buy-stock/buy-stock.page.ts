import { NavController } from '@ionic/angular';
import { Entities } from './../../entities/Entities';
import { Controller } from './../../BSL/controller';
import { Component } from '@angular/core';
import { common } from 'src/app/BSL/common';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.page.html',
  styleUrls: ['./buy-stock.page.scss'],
})
export class BuyStockPage {

  constructor(private ctl: Controller,
    private glb: Entities,
    private cmd: common,
    private nav: NavController) { }

  lstStock: [];
  stockInfo: any;
  stockData: any;
  moneyInput: any;
  moneyValue: any;
  moneyTarget: any;
  tencpbuy: any;
  ionViewWillEnter() {
    //Load list Stock has status = 1 (Da duyet)
    this.ctl.LoadConfirmStock().then(() => {
      this.lstStock = this.glb.getLstData();
    });    
    this.ctl.getStockByCode("").then(() => {
      this.stockData = this.glb.getDataObject();
    });
  }

  dismissModal() {
    this.ctl.dismissModal();
  }

  handleInput(event) {
    console.log("Input event")
    const items = Array.from(document.getElementById('listStock').children as HTMLCollectionOf<HTMLElement>);
    const query = event.target.value.toLowerCase();
    const parent2 = document.getElementById('stockInfo') as HTMLElement;
    parent2.style.display = 'none'
    if (query === '') {
      document.getElementById('listStock').style.display = 'none';
    }
    else {
      document.getElementById('listStock').style.display = 'block';
    }
    console.log(query);
    items.forEach(item => {
      const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
      item.style.display = shouldShow ? 'block' : 'none';

    });
  }

  handleClick(event, item) {
    const parent = document.getElementById('listStock') as HTMLElement;
    parent.style.display = 'block'
    // const input = document.querySelector('ion-input');
    // input.value = item;
    this.tencpbuy = item;
    // const tencp = document.getElementById('ten_cpbuy') as HTMLElement;
    // tencp.value = item;
    parent.style.display = 'none';
    this.ctl.getStockByCode(item).then(() => {
      this.stockData = this.glb.getDataObject();
    });
    const parent2 = document.getElementById('stockInfo') as HTMLElement;
    parent2.style.display = 'block'
  }

  updateList(ev) {
    this.moneyTarget = this.moneyValue;
    this.moneyValue = this.cmd.currencyFormatted(ev.target.value)
  }  

  handleThanhtoan(stocknum){
    if(stocknum === undefined){
      this.ctl.displayAlert("Số lượng cổ phiếu không được bỏ trống, vui lòng kiểm tra lại.");
    }
    else{
      stocknum = stocknum.toString().replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '').replace(".", '');
      if(!Number(stocknum) || stocknum.toString() === ""){
        this.ctl.displayAlert("Số lượng cổ phiếu không hợp lệ, vui lòng kiểm tra lại");
      }
      else if(stocknum <= 0){
        this.ctl.displayAlert("Số lượng cổ phiếu không hợp lệ, số lượng phải lớn hơn 0");
      }
      else{
        if(this.tencpbuy === undefined || this.tencpbuy === ''){
          this.ctl.displayAlert("Mã cổ phiếu không được bỏ trống.");
        }
        else{
          this.ctl.BuyStock(this.tencpbuy, stocknum).then(() => {
            this.nav.pop();
          });
        }
        
      }
    }
    
  }

  goBack(){
    this.nav.pop();
  }

}
