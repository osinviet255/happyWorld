import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Entities } from './../../entities/Entities';
import { Controller } from './../../BSL/controller';
import { Component } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage {

  lstData: any;
  fullName: any;
  email: any;
  phone: string;
  errorMesName: any;
  errorMesEmail: any;
  errorMesPhone: any;
  constructor(private ctl: Controller,
    private glb: Entities,
    private nav: NavController,
    private router: Router) { }
  ionViewWillEnter(){
    this.ctl.GetUserByUsername(this.glb.getUsername()).then(() => {
      this.lstData = this.glb.getLstData();
      for(let i = 0; i < this.lstData.length; i++){
        this.fullName = this.lstData[i].fullname;
        this.email = this.lstData[i].email;
        this.phone = this.lstData[i].phone;
      }
    });
   }

   handleEdit(status, balance){
     let bResult: Boolean = true;
     if(this.fullName === null || this.fullName === '' || this.fullName === undefined){
       var errName = document.getElementById("errName");
       errName.style.display = "block";
       this.errorMesName = "Họ tên không được để trống.";
       bResult = false;
     }
     if(this.email === null || this.email === '' || this.email === undefined){
      var errEmail = document.getElementById("errEmail");
      errEmail.style.display = "block";
      this.errorMesEmail = "Địa chỉ Email không được bỏ trống.";
      bResult = false;
     }
     else if(!this.ctl.isEmail(this.email)){
      var errEmail = document.getElementById("errEmail");
      errEmail.style.display = "block";
      this.errorMesEmail = "Địa chỉ Email không hợp lệ.";
      bResult = false;
     }
     if(this.phone === null || this.phone === '' || this.phone === undefined){
       var errPhone = document.getElementById("errPhone");
       errPhone.style.display = "block";
       this.errorMesPhone = "Số điện thoại không được bỏ trống.";
       bResult = false;
     }
     else{
       if(this.phone.length !== 10 || !this.phone.startsWith("0") || !Number(this.phone)){
        var errPhone = document.getElementById("errPhone");
        errPhone.style.display = "block";
        this.errorMesPhone = "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng 0xxx và có độ dài 10 chữ số."; 
        bResult = false;
       }
     }
     if(bResult){
       this.ctl.UpdateUser(this.glb.getUsername(), this.fullName, this.email, this.phone, status, balance).then(() => {
         if(this.glb.getDataObject() !== undefined && this.glb.getDataObject() !== null){
           this.ctl.displayAlert("Cập nhật thông tin thành công.");
           this.router.navigateByUrl('/tabs/persional');
         }
       });
     }
   }

   goBack() {
    this.nav.pop();
  }

  changeName(){
    console.log("input");
    var errName = document.getElementById("errName");
    errName.style.display = "none";
  }

  changeEmail(){
    var errEmail = document.getElementById("errEmail");
    errEmail.style.display = "none";
  }
  changePhone(){
    var errPhone = document.getElementById("errPhone");
    errPhone.style.display = "none";
  }

}
