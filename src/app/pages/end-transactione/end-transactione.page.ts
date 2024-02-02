import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-end-transactione',
  templateUrl: './end-transactione.page.html',
  styleUrls: ['./end-transactione.page.scss'],
})
export class EndTransactionePage implements OnInit {

  constructor(private router:Router) { 
    setTimeout(() => {
      this.router.navigate(['/main-cashier-interface'])
    }, 3000);
  }

  ngOnInit() {
  }

}
