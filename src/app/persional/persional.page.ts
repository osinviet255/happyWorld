import { Entities } from './../entities/Entities';
import { Component } from '@angular/core';

@Component({
  selector: 'app-persional',
  templateUrl: './persional.page.html',
  styleUrls: ['./persional.page.scss'],
})
export class PersionalPage {

  fullName: any;
  mobileNo: any;
  constructor(private glb: Entities) {
    this.fullName = this.glb.getFullName();
    this.mobileNo = this.glb.getMobileNo();
   }


}
