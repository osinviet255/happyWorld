import { Router } from '@angular/router';
import { Entities } from './../entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'],
})
export class NewsCategoryPage {

  lstNews: [];
  lstProjects: []
  constructor(private navCtrl: NavController,
    private ctl: Controller,
    private glb: Entities,
    private router: Router) { }

  ionViewWillEnter(){
    //Search List Project
    this.ctl.searchProject(0, 5).then(() => {
      this.lstProjects = this.glb.getLstData();
    });
   //Search List News
   this.ctl.searchNews(0, 5).then(() => {
     this.lstNews = this.glb.getLstData();
   });
  }

  goback() {
    this.navCtrl.pop();
  }

  goToDetailProj(id){
    this.ctl.getProjectById(id).then(() => {
      this.ctl.getStockByProjId(id).then(() => {
        this.router.navigate(['project-detail']);
      });      
    });
  }

  goToDetailNews(id){
    this.ctl.getNewsById(id).then(() => {
      this.router.navigate(['news']);
    });
  }
  goToListProj(){
    this.router.navigate(['list-project', 0]);
  }

  goToListNews(){
    this.router.navigate(['list-news', 0]);
  }
  showProject(){
    let duan = document.getElementById("idDuAn") as HTMLElement
    duan.style.display = "block";

    let tintuc = document.getElementById("idTintuc") as HTMLElement
    tintuc.style.display = "none";
  }

  showNews(){
    let duan = document.getElementById("idDuAn") as HTMLElement
    duan.style.display = "none";

    let tintuc = document.getElementById("idTintuc") as HTMLElement
    tintuc.style.display = "block";
  }
  showAll() {
    let duan = document.getElementById("idDuAn") as HTMLElement
    duan.style.display = "block";

    let tintuc = document.getElementById("idTintuc") as HTMLElement
    tintuc.style.display = "block";
  }
}
