import { Component, ElementRef, ViewChild } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Chart } from '../../../node_modules/chart.js';
import { Controller } from '../BSL/controller';
import { Entities } from '../entities/Entities';
import { ReportPageModule } from '../report/report.module';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  private lineChart: Chart;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  @ViewChild('lineCanvasLoinhuan') lineCanvasLoinhuan: ElementRef;
  lstDoanhThu: [];
  lstLoiNhuan: [];
  totalDoanhThu: any = 0;
  totalLoiNhuan: any = 0;
  tabRoot: any;
  projName: string;
  stockCode: any;
  lstProjInfo: [];
  stockData: any;
  labels = new Array;
  datas = new Array();
  labelsLoiNhuan = new Array;
  datasLoiNhuan = new Array();
  constructor(private router: Router,
    private ctl: Controller,
    private glb: Entities,
    private loadingNotif: LoadingController) {
      this.tabRoot = ReportPageModule;
     }

  ionViewDidEnter() {
    this.clearData();
    this.GetReportNam();    
    document.getElementById("idThang").className = "";
    document.getElementById("idQuy").className = "";
    document.getElementById("idNam").className = "activetab";
    this.projName = "Dự án";
    this.stockCode = "";
    this.ctl.GetListConfirmProj().then(() => {
      this.lstProjInfo = this.glb.getLstData();
    });
  }

  clearData(){
    this.lstDoanhThu = [];
    this.lstLoiNhuan = [];
    this.totalDoanhThu = 0;
    this.totalLoiNhuan = 0;
    this.datas = [0, 0, 0, 0];
    this.datasLoiNhuan = [0, 0, 0, 0];
    // this.lineCanvasLoinhuan = null;
    // this.lineCanvas = null;
  }

  gotoHistory() {
    this.router.navigateByUrl('history');
  }

  reportNam(){
    console.log("Nam tab clicked");
    document.getElementById("idThang").className = "";
    document.getElementById("idQuy").className = "";
    document.getElementById("idNam").className = "activetab";
    this.clearData();
    this.GetReportNam();
  }

  reportQuy(){
    console.log("Quy tab clicked");
    document.getElementById("idThang").className = "";
    document.getElementById("idQuy").className = "activetab";
    document.getElementById("idNam").className = "";
    this.clearData();
    this.GetReportQuy();
  }

  reportThang(){
    console.log("Thang tab clicked");
    document.getElementById("idThang").className = "activetab";
    document.getElementById("idQuy").className = "";
    document.getElementById("idNam").className = "";
    this.clearData();
    this.GetReportThang();
  }

  async GetReportNam(){
    //Doanh thu by Năm (All dự án)
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.glb.setloadingNotif(loading);
    this.ctl.GetDoanhThuByNam(this.stockCode).then(() => {
      this.lstDoanhThu = this.glb.getLstData();
      console.log("LstDoanhThu Length: " + this.lstDoanhThu.length);
      this.labels = new Array;
      this.datas = new Array();
      
      for (let i = 0; i < this.lstDoanhThu.length; i++) {
        let doanhThu: any;
        doanhThu = this.lstDoanhThu[i];
        let label = doanhThu.year.toString();
        let data = doanhThu.moneyNum / 1000000000;
        this.totalDoanhThu = this.totalDoanhThu + doanhThu.moneyNum;
        console.log("Label: " + label);
        this.labels.push(label);
        this.datas.push(data);
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          textAlign: 'right',
          datasets: [
            {
              label: "Doanh thu (ĐV: Tỷ đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datas,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
    });

    //GetLoiNhuan By Nam
    this.ctl.GetLoiNhuanByNam(this.stockCode).then(() => {
      this.lstLoiNhuan = this.glb.getLstData();
      console.log("lstLoiNhuan Length: " + this.lstLoiNhuan.length);
      this.labelsLoiNhuan = new Array;
      this.datasLoiNhuan = new Array();
      for (let i = 0; i < this.lstLoiNhuan.length; i++) {
        let loinhuan: any;
        loinhuan = this.lstLoiNhuan[i];
        let label = loinhuan.year.toString();
        let data = loinhuan.moneyNum / 1000000000;
        this.totalLoiNhuan = this.totalLoiNhuan + loinhuan.moneyNum;
        console.log("Label: " + label);
        this.labelsLoiNhuan.push(label);
        this.datasLoiNhuan.push(data);        
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvasLoinhuan.nativeElement, {
        type: "line",
        data: {
          labels: this.labelsLoiNhuan,
          textAlign: 'right',
          datasets: [
            {
              label: "Lợi nhuận (ĐV: Tỷ đồng đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datasLoiNhuan,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
      loading.dismiss();
    }); 
  }

  async GetReportQuy(){
    //Doanh thu by Năm (All dự án)
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.glb.setloadingNotif(loading);
    this.ctl.GetDoanhThuByQuy(this.stockCode).then(() => {
      this.lstDoanhThu = this.glb.getLstData();
      console.log("LstDoanhThu Length: " + this.lstDoanhThu.length);
      this.labels = new Array;
      this.datas = new Array();
      for (let i = 0; i < this.lstDoanhThu.length; i++) {
        let doanhThu: any;
        doanhThu = this.lstDoanhThu[i];
        let label = doanhThu.key.toString();
        let data = doanhThu.moneyNum / 1000000000;
        this.totalDoanhThu = this.totalDoanhThu + doanhThu.moneyNum;
        console.log("Label: " + label);
        this.labels.push(label);
        this.datas.push(data);
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          textAlign: 'right',
          datasets: [
            {
              label: "Doanh thu (ĐV: Tỷ đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datas,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
    });

    //GetLoiNhuan By Nam
    this.ctl.GetLoiNhuanByQuy(this.stockCode).then(() => {
      this.lstLoiNhuan = this.glb.getLstData();
      console.log("lstLoiNhuan Length: " + this.lstLoiNhuan.length);
      this.labelsLoiNhuan = new Array;
      this.datasLoiNhuan = new Array();
      for (let i = 0; i < this.lstLoiNhuan.length; i++) {
        let loinhuan: any;
        loinhuan = this.lstLoiNhuan[i];
        let label = loinhuan.key.toString();
        let data = loinhuan.moneyNum / 1000000000;
        this.totalLoiNhuan = this.totalLoiNhuan + loinhuan.moneyNum;
        console.log("Label: " + label);
        this.labelsLoiNhuan.push(label);
        this.datasLoiNhuan.push(data);
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvasLoinhuan.nativeElement, {
        type: "line",
        data: {
          labels: this.labelsLoiNhuan,
          textAlign: 'right',
          datasets: [
            {
              label: "Lợi nhuận (ĐV: Tỷ đồng đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datasLoiNhuan,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
      loading.dismiss();
    }); 
  }

  async GetReportThang(){
    //Doanh thu by Năm (All dự án)
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.glb.setloadingNotif(loading);
    this.ctl.GetDoanhThuByThang(this.stockCode).then(() => {
      this.lstDoanhThu = this.glb.getLstData();
      console.log("LstDoanhThu Length: " + this.lstDoanhThu.length);
      this.labels = new Array;
      this.datas = new Array();
      for (let i = 0; i < this.lstDoanhThu.length; i++) {
        let doanhThu: any;
        doanhThu = this.lstDoanhThu[i];
        let label = doanhThu.key.toString();
        let data = doanhThu.moneyNum / 1000000000;
        this.totalDoanhThu = this.totalDoanhThu + doanhThu.moneyNum;
        console.log("Label: " + label);
        this.labels.push(label);
        this.datas.push(data);
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          textAlign: 'right',
          datasets: [
            {
              label: "Doanh thu (ĐV: Tỷ đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datas,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
    });

    //GetLoiNhuan By Nam
    this.ctl.GetLoiNhuanByThang(this.stockCode).then(() => {
      this.lstLoiNhuan = this.glb.getLstData();
      console.log("lstLoiNhuan Length: " + this.lstLoiNhuan.length);
      this.labelsLoiNhuan = new Array;
      this.datasLoiNhuan = new Array();
      for (let i = 0; i < this.lstLoiNhuan.length; i++) {
        let loinhuan: any;
        loinhuan = this.lstLoiNhuan[i];
        let label = loinhuan.key.toString();
        let data = loinhuan.moneyNum / 1000000000;
        this.totalLoiNhuan = this.totalLoiNhuan + loinhuan.moneyNum;
        console.log("Label: " + label);
        this.labelsLoiNhuan.push(label);
        this.datasLoiNhuan.push(data);
      }
      console.log("Label Size: " + this.labels.length);
      this.lineChart = new Chart(this.lineCanvasLoinhuan.nativeElement, {
        type: "line",
        data: {
          labels: this.labelsLoiNhuan,
          textAlign: 'right',
          datasets: [
            {
              label: "Lợi nhuận (ĐV: Tỷ đồng đồng)",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 79, 116)',
              borderWidth: 1,
              pointBorderColor: false,
              data: this.datasLoiNhuan,
              fill: false,
              lineTension: .4,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 100
              }
            }]
          }
        }
      });
      loading.dismiss();
    }); 
  }

  drawChart(){
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        textAlign: 'right',
        datasets: [
          {
            label: "Doanh thu (ĐV: Tỷ đồng)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 79, 116)',
            borderWidth: 1,
            pointBorderColor: false,
            data: this.datas,
            fill: false,
            lineTension: .4,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 100
            }
          }]
        }
      }
    });

    this.lineChart = new Chart(this.lineCanvasLoinhuan.nativeElement, {
      type: "line",
      data: {
        labels: this.labelsLoiNhuan,
        textAlign: 'right',
        datasets: [
          {
            label: "Lợi nhuận (ĐV: Tỷ đồng đồng)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 79, 116)',
            borderWidth: 1,
            pointBorderColor: false,
            data: this.datas,
            fill: false,
            lineTension: .4,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 100
            }
          }]
        }
      }
    });
  }

  displayListProj(){    
    const parent = document.getElementById('projInfo') as HTMLElement;
    if(parent.style.display === 'block'){
      parent.style.display = 'none';
    }
    else{
      parent.style.display = 'block';
    }
  }

  handleClick(id, projName){
    this.clearData();
    console.log("Clicked item Proj with id: " + id);
    const parent = document.getElementById('projInfo') as HTMLElement;
    parent.style.display = "none";
    this.projName = projName.toString().length >= 20 ? projName.toString().substring(0, 20) + "..." : projName.toString();
    this.ctl.getStockByProjId(id).then(() => {
      if(this.glb.getLstData().length <= 0){
        this.clearData();
        this.drawChart();
      }
      else{
        for(let i = 0; i < this.glb.getLstData().length; i++){
          this.stockData = this.glb.getLstData()[i];
          this.stockCode = this.stockData.code;
          console.log(this.stockCode);
          document.getElementById("idThang").className = "";
          document.getElementById("idQuy").className = "";
          document.getElementById("idNam").className = "activetab";
          this.GetReportNam();
        }
      }
    });
  }

}
