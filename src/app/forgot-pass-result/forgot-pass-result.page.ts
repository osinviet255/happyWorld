import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass-result',
  templateUrl: './forgot-pass-result.page.html',
  styleUrls: ['./forgot-pass-result.page.scss'],
})
export class ForgotPassResultPage {

  constructor(private router: Router) { }

  handleLogin(){
    this.router.navigateByUrl('login');
  }

}
