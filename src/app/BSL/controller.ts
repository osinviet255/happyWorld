import { BuyStockPage } from './../stocks/buy-stock/buy-stock.page';
import { Entities } from './../entities/Entities';
import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Injectable()
export class Controller {
  crrModal: any = null;
  apiUrl: string;
  output: any;
  constructor(private modalController: ModalController,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private glb: Entities,
    private router: Router) {

  }

  async showModalRegister() {
    // console.log("clicked")
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'cssModalRegister',
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
    });
    await modal.present();
    this.crrModal = modal;
    return this.crrModal;
  }
  dismissModalRegister() {
    if (this.crrModal) {
      this.crrModal.dismiss().then(() => { this.crrModal = null; });
    }
  }

  async showModalBuyStock(){
    const modal = await this.modalController.create({
      component: BuyStockPage,
      cssClass: 'cssModalBuyStock',
      backdropDismiss: true,
      showBackdrop: true,
      animated: true
    });
    await modal.present();
    this.crrModal = modal;
    return this.crrModal;
  }

  dismissModal() {
    if (this.crrModal) {
      this.crrModal.dismiss().then(() => { this.crrModal = null; });
    }
  }

  async LoginApi(username, password) {
    const headers = { 'content-type': 'application/json' };
    let input = {
      username: username,
      password: password,
      rememberMe: true
    }
    let jsonInput = JSON.stringify(input);
    console.log("Login input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/authenticate/login';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("Login output: " + res);
        if (res.data === undefined) {
          this.displayAlert("Thông tin đăng nhập không hợp lệ. Quý khách vui lòng kiểm tra lại thông tin.")
        }
        else {
          if (res.data.status !== 1) {
            this.displayAlert("Tài khoản chưa được kích hoạt. Quý khách vui lòng liên hệ với quản trị viên.")
          }
          else {
            this.glb.setJwtTokenKey(res.data.jwtToken);
            this.glb.setRefreshToken(res.data.refreshToken);
            this.glb.setUsername(username);
            this.glb.setFullName(res.data.fullName);
            this.glb.setMobileNo(res.data.mobileNo);
            const now = new Date()
            const item = {
              acc: username,
              jwtToken: res.data.jwtToken,
              refreshToken: res.data.refreshToken,
              expiry: moment(now).add(1, 'hour'),
              fullName: res.data.fullName,
              mobileNo: res.data.mobileNo
            }
            localStorage.setItem('account', JSON.stringify(item));
            this.searchListUserStock(this.glb.getUsername(), 5).then(() => {              
              this.router.navigateByUrl('tabs');
            });            
          }

        }
      })
      .catch(err => {
        console.log("LoginApi...failed. Error: " + err.message);
        this.displayAlert("Thông tin đăng nhập không hợp lệ. Quý khách vui lòng kiểm tra lại thông tin.")
      })
  }

  async displayAlert(value) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: value,
      buttons: ['OK']
    });
    await alert.present();
  }

  VerifyMobileNumber84(mobileInput, ref: { mobileNumber: string }) {
    if (Number(mobileInput)) {
      if (mobileInput.startsWith("0") && mobileInput.length === 10) {
        ref.mobileNumber = "+84" + mobileInput.substring(1);
        return true;
      }
      else {
        if (!mobileInput.startsWith("+84") || mobileInput.length !== 12) {
          this.displayAlert("Số điện thoại không hợp lệ, Quý khách vui lòng kiểm tra lại.");
          return false;
        }
        else {
          ref.mobileNumber = mobileInput;
        }
      }
    }
    else {
      this.displayAlert("Số điện thoại không hợp lệ, Quý khách vui lòng kiểm tra lại.");
      return false;
    }
  }

  async RegisterApi(username, password, fullName, email, phone) {
    this.validateToken();
    const headers = { 'content-type': 'application/json' };
    let input = {
      username: username,
      phone: phone,
      email: email,
      password: password,
      fullName: fullName,
      referralCode: this.glb.getverificationId
    }
    let jsonInput = JSON.stringify(input);
    console.log("Login input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/authenticate/register';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("Register output: " + res);
        if (res.code !== "00") {
          this.displayAlert("Đăng ký không thành công, vui lòng thử lại sau.")
        }
        else {
          if (res.data.resCode === "85") {
            this.displayAlert("Đăng ký không thành công, tài khoản đã tồn tại. Vui lòng kiểm tra lại.")
          }
          else {
            this.router.navigateByUrl('login');
          }
        }

      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("RegisterApi...failed. Error: " + err.message);
          this.displayAlert("Đăng ký không thành công, vui lòng thử lại sau.")
        }

      })
  }

  async ForgotPassword(username, email, password) {
    const headers = { 'content-type': 'application/json' };
    let input = {
      username: username,
      email: email,
      otp: '',
      password: password
    }
    let jsonInput = JSON.stringify(input);
    console.log("Login input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/authenticate/forgotPassword';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("ForgotPassword output: " + res);
        if (res.code !== "00") {
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.")
        }
        else {
          if (res.data.resCode === "81") {
            this.displayAlert("Tên đăng nhập hoặc địa chỉ email không đúng. Quý khách vui lòng kiểm tra lại.")
          }
          else {
            //Send Password to Email
            let subject = "Đặt lại mật khẩu trên ứng dụng Happy World";
            let body = "<html><head><meta charset=\"UTF-8\"></head><body>CÓ AI ĐÓ ĐÃ THỰC HIỆN LẤY LẠI MẬT KHẨU TRÊN ỨNG DỤNG HAPPYWORLD! <br />Quý khách vui lòng kiểm tra lại thông tin để tránh sai sót. <br />Tài khoản: " + username + "<br />Mật khẩu mới: " + password + "</div></body></html>";
            this.sendEmail(email, subject, body);
            this.router.navigateByUrl('forgot-pass-result');
          }
        }

      })
      .catch(err => {
        if (err.status === 403) {
          this.displayAlert("Phiên đăng nhập hết hiệu lực, Quý khách vui lòng đăng nhập lại.");
          localStorage.removeItem("account");
          this.router.navigateByUrl('login');
        }
        else {
          console.log("ForgotPassword...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.")
        }

      });
  }

  async sendEmail(toEmail, subject, body) {
    const headers = { 'content-type': 'application/json' };
    let input = {
      EMAIL: toEmail,
      SUBJECT_EMAIL: subject,
      BODY_EMAIL: body
    }
    let jsonInput = JSON.stringify(input);
    console.log("sendEmail input: " + jsonInput);
    this.apiUrl = 'https://uat-api.1sg.vn/api/WebAutomate/SendEmailV2';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("sendEmail output: " + res);

      })
      .catch(err => {
        console.log("sendEmail...failed. Error: " + err.message);
        this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.")
      });
  }

  randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-/.<,>{[}]|';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async createMoneyTrans(trace, username, type, price, status) {
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      trace: trace,
      userName: username,
      type: type,
      price: price,
      status: status,
      transDate: new Date()
    }
    let jsonInput = JSON.stringify(input);
    console.log("createMoneyTrans input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/moneytransaction/createMoneyTrans';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("createMoneyTrans output: " + res);
        if (res.code !== "00") {
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.")
        }
        else {
          if (res.data.resCode !== "00") {
            this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.")
          }
          else {
            this.displayAlert("Bạn đã nạp tiền thành công. Vui lòng chờ admin xác nhận giao dịch thanh toán.")
            this.router.navigateByUrl('tabs/home-page');
          }
        }

      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("createMoneyTrans...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }

      });
  }

  async searchListUserStock(username, pageSize) {
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      username: username,
      pageIndex: 0,
      pageSize: pageSize
    }
    let jsonInput = JSON.stringify(input);
    console.log("searchListUserStock input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/userstock/search';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("searchListUserStock output: " + res.data);
        this.glb.setLstData(res.data.content);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("searchListUserStock...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      })
  }

  async searchProjectByType(typeId) {
    this.validateToken();
    console.log("ID: " + typeId);
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      projectTypeId: typeId,
      pageIndex: 0,
      pageSize: 10
    }
    let jsonInput = JSON.stringify(input);
    console.log("searchProjectByType input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/project/searchProject';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("searchProjectByType output: " + res.data);
        this.glb.setLstData(res.data.content);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("searchProjectByType...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      })
  }

  async getProjectById(projId) {
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      id: projId
    }
    let jsonInput = JSON.stringify(input);
    console.log("getProjectById input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/project/getProjectById';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("getProjectById output: " + res.data);
        this.glb.setDataObject(res.data);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("getProjectById...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      })
  }

  async getStockByProjId(projId) {
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      idProject: projId,
      pageIndex: 0,
      pageSize: 10
    }
    let jsonInput = JSON.stringify(input);
    console.log("getStockByProjId input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/stock/searchStockByProjId';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("getStockByProjId output: " + res.data);
        this.glb.setLstData(res.data.content);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("getStockByProjId...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      })
  }

  async getStockByCode(stockCode){
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      code: stockCode
    }
    let jsonInput = JSON.stringify(input);
    console.log("getStockByCode input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/stock/searchStockByCode';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("getStockByCode output: " + res.data);
        this.glb.setDataObject(res.data);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("getStockByCode...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      })
  }

  async validateToken(){
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      id: 0
    }
    let jsonInput = JSON.stringify(input);
    console.log("validateToken input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/moneytransaction/getById';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        // console.log("validateToken output: " + res.data);
      })
      .catch(err => {
        if (err.status === 403) {
          this.displayAlert("Phiên đăng nhập hết hiệu lực, Quý khách vui lòng đăng nhập lại.");
          localStorage.removeItem("account");
          this.router.navigateByUrl('login');
        }
        else {
          console.log("validateToken...failed. Error: " + err.message);
        }
      })
  }

  async CreateChatHistory(username, groupname, chatcontent){
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      username: username,
      groupName: groupname,
      chatContent: chatcontent
    }
    let jsonInput = JSON.stringify(input);
    console.log("CreateChatHistory input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/chatHistory/createHistory';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("CreateChatHistory output: " + res.data);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("CreateChatHistory...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
      });
  }

  async LoadConfirmStock(){
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let arrTmp: [];
    let arrResp: [];
    let input = {
      status: 1,
      pageIndex: 0,
      pageSize: 1000000000
    }
    let jsonInput = JSON.stringify(input);
    console.log("LoadConfirmStock input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/stock/searchStock';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("LoadConfirmStock output: " + res.data);
        arrResp = res.data.content;
        for(let i = 0; i < arrResp.length; i++){
          console.log(arrResp[i]);
        }
        this.glb.setLstData(arrResp);
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("LoadConfirmStock...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
          this.dismissModal();
        }
      });
  }

  async BuyStock(stockCode, stockNumber){
    this.validateToken();
    const headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.glb.getJwtTokenKey() };
    let input = {
      code: Math.floor(Math.random()*(999999999-0+1)+0),
      username: this.glb.getUsername(),
      projectCode: 0,
      stockCode: stockCode,
      type: 1,
      status: 1,
      stockNumber: stockNumber
    }
    let jsonInput = JSON.stringify(input);
    console.log("BuyStock input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/transaction/createTransaction';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("BuyStock output: " + res.data);
        if(res.data.code != "00"){
          this.displayAlert(res.data.description);
        }
        else{
          this.displayAlert("Mua cổ phiếu thành công!");
          this.searchListUserStock(this.glb.getUsername(), 5).then(() => {
            this.dismissModal();
          });
          
        }
      })
      .catch(err => {
        if (err.status !== 403) {
          console.log("BuyStock...failed. Error: " + err.message);
          this.displayAlert("Có lỗi xảy ra, vui lòng thử lại sau.");
          this.dismissModal();
        }
      });

  }
}