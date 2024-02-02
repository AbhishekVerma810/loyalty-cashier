import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-successful',
  templateUrl: './connection-successful.page.html',
  styleUrls: ['./connection-successful.page.scss'],
})
export class ConnectionSuccessfulPage implements OnInit {

  constructor(
    private router:Router,
  ) { 
    setTimeout(() => {
      this.router.navigate(['/main-cashier-interface'])
    }, 2000);
   
  }
   ngOnInit() {
  }

}
