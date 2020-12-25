import { Controller } from './../../BSL/controller';
import { Entities } from './../../entities/Entities';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage {

  dataObj: any;
  stockData: any;
  constructor(private nav: NavController,
    private glb: Entities,
    private ctl: Controller) {
      this.dataObj = this.glb.getDataObject();
      this.stockData = this.glb.getDataObject();
      let projId = this.dataObj.idProject;
      console.log(projId);
      this.ctl.getStockByProjId(projId).then(() => {        
        this.stockData = this.glb.getDataObject();
      });
     }

  goback(){
    this.nav.pop();
  }
}
