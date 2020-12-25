import { Entities } from './../../entities/Entities';
import { Controller } from './../../BSL/controller';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.page.html',
  styleUrls: ['./buy-stock.page.scss'],
})
export class BuyStockPage {

  constructor(private ctl: Controller,
    private glb: Entities) { }

  lstStock: [];
  moneyInput: any;
  moneyValue: any;
  ionViewWillEnter() {
    //Load list Stock has status = 1 (Da duyet)
    this.ctl.LoadConfirmStock().then(() => {
      this.lstStock = this.glb.getLstData();
    });
  }

  dismissModal() {
    this.ctl.dismissModal();
  }

  handleInput(event) {
    console.log("Input event")
    const items = Array.from(document.querySelector('ion-list').children as HTMLCollectionOf<HTMLElement>);
    const query = event.target.value.toLowerCase();
    if (query === '') {
      document.querySelector('ion-list').style.display = 'none';
    }
    else {
      document.querySelector('ion-list').style.display = 'block';
    }
    console.log(query);
    items.forEach(item => {
      const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
      item.style.display = shouldShow ? 'block' : 'none';

    });
  }

  handleClick(event, item) {
    const parent = document.querySelector('ion-list') as HTMLElement;
    parent.style.display = 'block'
    const input = document.querySelector('ion-input');
    input.value = item;
    parent.style.display = 'none';
  }

  updateList(ev) {
    this.moneyValue = this.currencyFormatted(ev.target.value)
  }

  formatCurrency(value: any) {
    let moneyTmp = value.target.value.replace(",", "");
    this.moneyValue = moneyTmp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  currencyFormatted(amount) {

    var formatedValue = amount;
    var real = '';
    var cents = '';
    var temp = [];
    var i = 0;
    var j = 0;
    var k = 0;

    formatedValue = this.clearString(formatedValue.toString(), "0123456789");

    if (formatedValue.length > 3) {

      real = formatedValue.substr(0, formatedValue.length);
      real = "" + parseInt(real, 10);
      cents = formatedValue.substr(formatedValue.length - 3, 3);

      if (real.length > 3) {
        temp = [];
        for (i = real.length - 1, j = 1, k = 0; i > 0; i--, j++) {
          if ((j % 3) == 0) {
            temp.push(real.substr(i, 3));
            k++;
          }
        }
        temp.reverse();
        real = real.substr(0, real.length - (3 * k)) + '.' + temp.join('.');
      }
      // formatedValue = real + ',' + cents;
      formatedValue = real
    }
    return formatedValue;
  }

  clearString(value, validCharacters) {
    var result = '';
    var index = -1;
    var i = 0;

    for (i = 0; i < value.length; i++) {
      index = validCharacters.indexOf(value.charAt(i));

      if (index > -1) {
        result += validCharacters.charAt(index);
      }
    }
    return result;
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
      this.ctl.BuyStock(input.value, stocknum);
    }
  }

}
