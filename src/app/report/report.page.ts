import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from '../../../node_modules/chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  private lineChart: Chart;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  @ViewChild('lineCanvasLoinhuan') lineCanvasLoinhuan: ElementRef;
  constructor(private router: Router) { }

  ionViewDidEnter() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["2016", "2017", "2018", "2019"],
        textAlign: 'right',
        datasets: [
          {
            label: "Doanh thu (ĐV: Triệu đồng)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 79, 116)',
            borderWidth: 1,
            pointBorderColor: false,
            data: [5, 30, 50, 100],
            fill: false,
            lineTension: .4,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 40
            }
          }]
        }
      }
    });

    this.lineChart = new Chart(this.lineCanvasLoinhuan.nativeElement, {
      type: "line",
      data: {
        labels: ["2016", "2017", "2018", "2019"],
        textAlign: 'right',
        datasets: [
          {
            label: "Lợi nhuận (ĐV: Triệu đồng)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 79, 116)',
            borderWidth: 1,
            pointBorderColor: false,
            data: [3, 15, 40, 90],
            fill: false,
            lineTension: .4,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 40
            }
          }]
        }
      }
    });
  }

  gotoHistory(){
    this.router.navigateByUrl('history');
  }

}
