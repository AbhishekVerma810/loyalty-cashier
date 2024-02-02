import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-business-id-page',
  templateUrl: './business-id-page.page.html',
  styleUrls: ['./business-id-page.page.scss'],
})
export class BusinessIdPagePage implements OnInit {
  // businessId: string='';
  // constructor(private router:Router,private apiService:ApiService) { }
  // ngOnInit() { }
  //  submitBusinessId() {
  //    const data={
  //       business_id:this.businessId
  //     }
  //     console.log('Business ID submitted:', this.businessId);
  //     try{
  //         this.apiService.getBusinessId(data).subscribe(res=>{
  //         console.log('business_data',res)
  //         localStorage.setItem('business_data', JSON.stringify(res));
  //         this.router.navigate(['/cashier-login']);
  //        })
  //       }catch(err){
  //       console.log('we getting some error');
  //      }
  //    }
  // }

  businessId: string = '';
  constructor(private router: Router, private apiService: ApiService, private loader: LoaderService,
    private message: MessageService,
  ) { }

  ngOnInit() {
  }
  addToBusinessId(value: any) {
    this.businessId += value;
  }
  removeLastDigit() {
    this.businessId = this.businessId.slice(0, -1);
  }
  submitBusinessId() {
    const data = {
      business_id: this.businessId
    }
    try {
        this.apiService.getBusinessId(data).subscribe(res => {
        console.log('business_data', res)
        localStorage.setItem('business_data', JSON.stringify(res));
        this.router.navigate(['/cashier-login']);
        this.message.presentToast('Connect with business', 'success');
        }, (error) => {
        this.message.presentToast('Something went wrong', 'danger');
      })
    } catch (err) {
      console.log('we getting some error');
    }
   }
}
