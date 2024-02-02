import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { constantKeys } from 'src/constant/constant';
 
@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
})
export class CustomerLoginPage implements OnInit {
  number: string = '';
  businessData: any;
  business_data = "business_data"
  organization_id: string = '';
  loginType:string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loader: LoaderService,
    private message: MessageService,
    private ActiveRoute: ActivatedRoute,
    ) {
    const storedData = this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    this.organization_id = this.businessData.data.id
  }

  ngOnInit() {
    this.ActiveRoute.paramMap.subscribe(params => {
      // Use the 'get' method to retrieve the value of the 'OnCall' parameter
      this.loginType=params.get('type');
      // You can now use this.onCallValue as needed in your component
      console.log('loginType',this.loginType);
    });
  }
  navigatewellcome() {
    this.router.navigate(['/welcome-screen'])
  }
  addToBusinessId(value: any) {
    this.number += value;
  }
  removeLastDigit() {
    this.number = this.number.slice(0, -1);
  }
  
  submit() {
    if (!this.number) {
      this.message.presentToast('All fields are required', 'danger');
    } else {
  
    const data = {
      contact_number: this.number,
      organization_id: this.organization_id.toString()
    }
    console.log('Business ID submitted:', this.number);
    try {
      this.apiService.customerLogin(data).subscribe((res: any) => {
        console.log('ressssss=>', res)
        if (res.data.userType == 'NEW') {
          localStorage.setItem(constantKeys.onCall,'true');
          localStorage.setItem(constantKeys.customerProfileinfo, JSON.stringify(res.data));
          this.router.navigate(['/customer-signup/OnCall'], { queryParams: { number: this.number } });
        } else if(res.data.userType == 'OLD'){
          localStorage.setItem(constantKeys.customerProfileinfo, JSON.stringify(res.data));
          localStorage.setItem(constantKeys.onCall,'true');
          this.router.navigate(['/welcome-screen'])
        }
        else {   
          // this.message.presentToast(res.message, 'danger');
          this.router.navigate(['/welcome-screen'])
        }
      },(error) => {
          if (error.status === 401) {
            this.message.presentToast('Moblile number Incorrect', 'danger');
           } else {
            this.router.navigate(['/customer-signup/OnCall'], { queryParams: { number: this.number } });
           }
        }
      )
    }
    catch (err) {
      console.log('we getting some error');
    }
  }
 }
}


