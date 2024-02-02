import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cashier-login',
  templateUrl: './cashier-login.page.html',
  styleUrls: ['./cashier-login.page.scss'],
})
export class CashierLoginPage implements OnInit {
  business_data="business_data";
  businessData: any;
  email: any;
  password: any;
 
  constructor(private router:Router,private apiService:ApiService,private loader: LoaderService,
    private message: MessageService,) { 
    const storedData =this.apiService.getLocalStorageData(this.business_data);
    // this.businessData = JSON.parse(storedData);
    if(storedData ){
      this.businessData = JSON.parse(storedData);
      document.documentElement.style.setProperty('--primary-color', this.businessData.data?.theme_color || '#00308F');
      console.log('this.businessData======>',this.businessData)
    }
 }
  ngOnInit() {}
  onSubmit() {
    if (!this.email || !this.password) {
      this.message.presentToast('All fields are required', 'danger');
    } 
    const data={
      email:this.email,
      password:this.password
     }
     console.log('data',data)
     console.log('Business ID submitted:', this.email);
     try{
        this.apiService.login(data).subscribe(res=>{
          console.log('ressssss=>',res)
          localStorage.setItem('user_data', JSON.stringify(res));
          this.router.navigate(['/code-screen'])   
          this.email="";
          this.password="";
      })
     }catch(err){
      console.log('we getting some error');
    }
  }
}
