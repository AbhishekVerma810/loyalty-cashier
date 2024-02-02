import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
})
export class WelcomeScreenPage implements OnInit {
  businessData: any;
  business_data="business_data";

  constructor(private router:Router,private apiService:ApiService,) { 
     setTimeout(()=>{
        this.router.navigate(['/main-cashier-interface']);
      },3000)
    const storedData =this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    console.log('this.businessData======>',this.businessData)
   }
   ngOnInit() {
  }
}
