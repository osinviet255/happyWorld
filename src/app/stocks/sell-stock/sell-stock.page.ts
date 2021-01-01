import { Component } from '@angular/core';
import { common } from 'src/app/BSL/common';
import { Controller } from 'src/app/BSL/controller';
import { Entities } from 'src/app/entities/Entities';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.page.html',
  styleUrls: ['./sell-stock.page.scss'],
})
export class SellStockPage {

  constructor(private ctl: Controller,
    private glb: Entities,
    private cmd: common) { }
    lstStock: [];
    moneyInput: any;
    moneyValue: any;
    stockCode: any;
    stockNumber: any;

    ionViewWillEnter() {
      //Load list Stock has status = 1 (Da duyet)
      this.ctl.SearchUserStock(this.glb.getUsername()).then(() => {
        this.lstStock = this.glb.getLstData();
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

    handleClick(event, item, amount) {
      const parent = document.getElementById('listStock') as HTMLElement;
      parent.style.display = 'block'
      const input = document.querySelector('ion-input');
      input.value = item;
      parent.style.display = 'none';
      this.stockCode = item;
      this.stockNumber = amount;
      const parent2 = document.getElementById('stockInfo') as HTMLElement;
      parent2.style.display = 'block'
    }
  
    updateList(ev) {
      this.moneyValue = this.cmd.currencyFormatted(ev.target.value)
    }

    handleThanhtoan(stocknum){
      stocknum = stocknum.toString().replaceAll(".","");
      if(!Number(stocknum)){
        this.ctl.displayAlert("Số lượng cổ phiếu không hợp lệ, vui lòng kiểm tra lại");
      }
      else if(stocknum <= 0){
        this.ctl.displayAlert("Số lượng cổ phiếu không hợp lệ, số lượng phải lớn hơn 0");
      }
      else{
        const input = document.querySelector('ion-input');
        this.ctl.SellStock(input.value, stocknum);
      }
    }

}
