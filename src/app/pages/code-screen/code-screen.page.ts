import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { io } from "socket.io-client"
import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-code-screen',
  templateUrl: './code-screen.page.html',
  styleUrls: ['./code-screen.page.scss'],
})
export class CodeScreenPage implements OnInit {
  number: string = '';
  userData:any;
  business_data = "business_data";
  businessData: any;
  Unique_code: string ='';
  businessinfo: any
  private socket: any;

  constructor(private router: Router, private apiService: ApiService, private storageservice: StorageService) {
    const storedData = this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    console.log('this.businessData======>', this.businessData)
    this.getStorageinfo();
    this.socket = io(environment.socketIo);
    this.socket.on(`${this.Unique_code}`, (message: any) => {
      console.log(`-item: ${message.item}-bussnessId-${message.bussnessId}`);
    });

    this.socket.on(`receive_Bussness_Response${this.Unique_code}`, (message: any) => {
      console.log(`receive_Bussness_Response: ${message}`);
    });
    this.socket.on(`receive_Bussness`, (message: any) => {
      console.log(`receive_Bussness: ${message}`);
    });
  } ngOnInit() {
    // Retrieve the JSON string from local storage
    const storedData = localStorage.getItem('user_data');

    // Parse the JSON string into a JavaScript object
    const userData = JSON.parse(storedData);

    // Now 'userData' contains the data stored in 'user_data'
    console.log('userData',userData);
    if(userData)
    {
      this.userData=userData;
    }

  }
  navigatewellcome() {
    this.router.navigate(['/connection-successful'])
  }
  addToBusinessId(value: any) {
    this.Unique_code += value;
    console.log(' this.Unique_code==>', this.Unique_code)
  }
  removeLastDigit() {
    this.Unique_code = this.Unique_code.slice(0, -1);
  }
  submitUnique_code() {
    console.log('uiniqcode', this.Unique_code)
    let info = {
      org_id: this.businessData.data.id,
      unique: this.Unique_code,
      cashier_id:this.userData.data.id
    }
    console.log('r_res',info)
    this.socket.emit('cashierConnection', info);
    console.log('r_res',this.socket.emit('cashierConnection', info))
    this.socket.on(`receive_Bussness_Response${this.Unique_code}`, (res: any) => {
      let r_res = res
      console.log('r_res',r_res)
      if (r_res) {
        console.log('Connection successfully receive_Bussness_Response', r_res);
        if (res.status == 1) {
          r_res = JSON.stringify(r_res);
          this.storageservice.set(constantKeys.connectioninfo, r_res)
          this.navigatewellcome();
        }else{
           
          console.log('CODE NOT FOUND.............');
        }
      }
    });
  }
  getStorageinfo() {
    this.storageservice.get(constantKeys.businessInfo).then(data => {
      if (data) {
        let info = JSON.parse(data);
        if (info) {
          this.businessinfo = info;
          console.log("businessinfo", this.businessinfo)
          console.log('TRUE')
        } else {
          console.log('FALSE')
        }
      }
    });
  }
}
