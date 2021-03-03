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
  pageIndex: any = 0;
  searchInput: any;
  constructor(private nav: NavController,
    private route: ActivatedRoute,
    private ctl: Controller,
    private glb: Entities,
    private router: Router) {
    this.sub = this.route.params.subscribe(param => {
      this.projTypeId = param['projTypeId'];
      console.log("ProjTypeID: " + this.projTypeId);
      this.pageIndex = 0;
      this.ctl.searchProjectByType(this.searchInput, this.projTypeId, this.pageIndex, 10).then(() => {
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

  async loadMoreData(event){
    this.pageIndex = this.pageIndex + 1;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.ctl.searchProjectByType(this.searchInput, this.projTypeId, this.pageIndex, 10).then(() => {
      for(let i =0; i < this.glb.getLstData().length; i++){
        this.lstData.push(this.glb.getLstData()[i]);
      }
      event.target.complete();
      
    });
  }

  handleSearch(){
    this.pageIndex = 0;
    this.ctl.searchProjectByType(this.searchInput, this.projTypeId, this.pageIndex, 10).then(() => {
      this.lstData = this.glb.getLstData();
    });
  }
}
