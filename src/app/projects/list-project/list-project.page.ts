import { Entities } from './../../entities/Entities';
import { Controller } from './../../BSL/controller';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.page.html',
  styleUrls: ['./list-project.page.scss'],
})
export class ListProjectPage {

  sub: any;
  projTypeId: any;
  lstData: [];
  constructor(private nav: NavController,
    private route: ActivatedRoute,
    private ctl: Controller,
    private glb: Entities,
    private router: Router) {
    this.sub = this.route.params.subscribe(param => {
      this.projTypeId = param['projTypeId'];
      console.log("ProjTypeID: " + this.projTypeId);
      this.ctl.searchProjectByType(this.projTypeId).then(() => {
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
    this.ctl.getProjectById(id).then(() => {
      this.ctl.getStockByProjId(id).then(() => {
        this.router.navigate(['project-detail']);
      });      
    });
    
  }
}
