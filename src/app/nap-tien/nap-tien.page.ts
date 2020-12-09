import { Entities } from './../entities/Entities';
import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-nap-tien',
  templateUrl: './nap-tien.page.html',
  styleUrls: ['./nap-tien.page.scss'],
})
export class NapTienPage {

  constructor(public navCtrl: NavController, private ctl: Controller, private glb: Entities,
    private currencyPipe: CurrencyPipe) { }

  moneyInput: any;
  moneyValue: any;
  goback() {
    this.navCtrl.pop();
  }

  naptien(money) {
    money = money.toString().replaceAll(".","");
    if(Number(money) && Number(money) >= 50000){
      this.ctl.createMoneyTrans(this.ctl.randomString(10), this.glb.getUsername(), 0, money, 0);
    }
    else{
      this.ctl.displayAlert("Số tiền nạp không hợp lệ. Số tiền phải lớn hơn 50.000đ. Quý khách vui lòng kiểm tra lại.")
    }
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

}
