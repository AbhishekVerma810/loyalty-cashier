import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Swiper } from 'swiper';
import{io} from "socket.io-client"
import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main-cashier-interface',
  templateUrl: './main-cashier-interface.page.html',
  styleUrls: ['./main-cashier-interface.page.scss'],
})
export class MainCashierInterfacePage implements OnInit {
  noUser=false;
  Waiting=false;
  amount: number;
  loyaltypoints:any
  timer: any;
  OnCall:boolean=false;
  OnCallMs:boolean=true;
  handlerMessage = '';
  roleMessage = '';
  connectioninfo:any;
  private socket: any;
  public message: string = '';
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  availableUser=true;
  cancle_btn=true;
  business_data="user_data";
  businessData: any;
  clientInfo: any;
  rewardinfo: any;
  bussnessId:any="";
  selectedOffer:any;
  selectedOfferData:any;
  
  constructor(private router:Router,
    private apiService:ApiService,
    private storageservice:StorageService,
    private alertController: AlertController,
    private activeroute:ActivatedRoute
    ) { 
    const storedData =this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    console.log('this.businessData======>',this.businessData)
    this.socket =io(environment.socketIo);

    this.socket.on(this.bussnessId, (message:any) => {
      console.log(`Received broadcast: ${message.message}`);
    });
    this.socket.on('message', (message:any) => {
      console.log(`message: ${message}`);
    });
    this.socket.on(`response-${this.bussnessId}`, (message:any) => {
      console.log(`message: ${message}`);
    });
    // this.socket.emit('7890', '7890');
    this.socket.emit('sendBussnessId', this.bussnessId);
    this.socket.on(`receive_Bussness_Response_${this.bussnessId}`, (message:any) => {
      this.selectedOffer=message.item;
      // this.disconectOnCall();  //jk47
      console.log(`receive_Bussness_Response - item: ${message.item}-bussnessId-${message.bussnessId}`);
    });
   }
   swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
    console.log(' this.swiper====>', this.swiper)
  }
 
  goNext() {
    console.log(' this.swiper====>', this.swiper)
    this.swiper?.slideNext();
  }
 
  goPrev() {
    console.log(' this.swiper====>', this.swiper)
    this.swiper?.slidePrev();
  }
 
  ngOnInit() {
    this.amount = null;
    this.getStorageinfo();
    this.noUser=true;
    this.availableUser=false;
    this.GetOrderOnCallInfoFun();
    if(this.connectioninfo && this.connectioninfo.org_id)
    {
      this.getRewardFun(this.connectioninfo.org_id);
    }
  }
  ionViewWillEnter() {
    this.activeroute.url.subscribe(url => {
      console.log('Navigated to page from route:', url);
      this.ngOnInit();
    });
  }
  getStorageinfo(){
    this.storageservice.get(constantKeys.connectioninfo).then(data => {
      if(data)
      {
        console.log(data);
        let info = JSON.parse(data);
        if(info)
        {
          this.connectioninfo=info;
          this.bussnessId=info.code
          console.log("connectioninfo",this.connectioninfo)
          if(this.connectioninfo && this.connectioninfo.org_id)
          {
            this.getRewardFun(this.connectioninfo.org_id);

          }
          this.socket.on(`${this.connectioninfo.connection_route}`, (message:any) => {
            this.selectedOffer=message.item;
            console.log('this.connectioninfo.connection_route',`receive_Bussness_Response - item: ${message.item}-bussnessId-${message.bussnessId}`);
          });
          console.log(`receive_Bussness_Response_${this.bussnessId}`)
          this.socket.on(`receive_Bussness_Response_${this.bussnessId}`, (message:any) => {
            this.ShowDataFun(false,true);
            if(this.OnCall && this.OnCallMs)
            {
              this.OnCallMs = false;
            this.timer = setTimeout(() => {
              this.OnCallMs = true;
          }, 60000);
            if(message && message.userId)
            {
              this.presentAlert(message.userId);
            }
              return
            }else{
              console.log('user waiting')
            }
            if(this.OnCall)
            {
              return;
            }
            this.selectedOffer=message.item;
            if(message && message.endtransaction)
            {
              this.exitSession();
              // this.router.navigateByUrl('/end-transactione'); //jk47
              return
            }
            if(this.selectedOffer && this.rewardinfo)
            {
              this.selectedOfferData = this.rewardinfo.find(item => item.id === this.selectedOffer)
            }else{
              console.log('rewardinfo not found or selectedOffer')
            }
            console.log('selected item data ',this.selectedOfferData)
            if(!this.clientInfo || !this.clientInfo.id && message.userId || this.clientInfo.id != message.userId)
            {
              let data={
                userId:message.userId
              }
              if(!message.userId)
              {
                console.log('message',message,'user id not found ')
                return
              }
              this.getuserinfoFun(data);
            }
            // console.log(`receive_Bussness_Response - item: ${message.item}-bussnessId-${message.bussnessId}`);
          });
          this.socket.on(`responseEvent`, (message:any) => {
            // console.log('messages....',message);
          })
          console.log('TRUE')  
        }else{
          console.log('FALSE')
        }
      }
   });
  }
  getuserinfoFun(data:any)
  {
    this.apiService.getuserinfo(data).subscribe((userinfo:any)=>{
      console.log('userinfo',userinfo)
      if(userinfo && userinfo.data)
      {
        this.ShowDataFun(false,true); //this.noUser=false;this.availableUser=true;
        if(this.OnCall)
          {
            console.log('The cashier is currently on a call, but a user is attempting to interact with them.')
            return
          }
        this.clientInfo=userinfo.data;
        //Get loyalty points for defoult value
        this.getLoyaltyPointsFun(100);
      }
    },(error=>{
      console.log('error',error)
    }))
  }
  logOut(){
    localStorage.removeItem('user_data');
    localStorage.removeItem(constantKeys.onCall);
    this.router.navigate(['/cashier-login']);
    let instruction={
      endtransaction:true,
      bussnessId:this.connectioninfo.code,
      cashierLogout:true
    }
    this.socket.emit('endtransaction',instruction);
   }
  exitSession(){
    this.noUser=true; 
    this.availableUser=false; 
    this.amount
    //Cencel On Call
    this.disconectOnCall();
    let instruction={
      endtransaction:true,
      bussnessId:this.connectioninfo.code
    }
    if(!this.OnCall)
    {
      this.socket.emit('endtransaction',instruction);
    }
  }
  getRewardFun(id:any)
 {
  let data ={
    'organization_id':id
  }
  this.apiService.getReward(data).subscribe((reward:any)=>{
    if(reward && reward.data)
    {
      console.log('reward',reward);
      this.rewardinfo=reward.data;
    }else{
      console.log('NO DATA FOUND FOR REWARD')
    }
  },(error=>{
    console.log('error',error);
  }))
 }
 onInputChange(event: any) {
  if(this.amount>0)
  {
    this.getLoyaltyPointsFun(this.amount);
  }
}
 getLoyaltyPointsFun(amount:number)
 {
  let data ={
    "transaction_amount":amount,
    "customer_id":this.clientInfo.id,
    "organization_id":this.connectioninfo.org_id
  }
  this.apiService.getLoyaltyPoints(data).subscribe((points:any)=>{
    if(points && points.data)
    {
      console.log('points',points);
      this.loyaltypoints=  `${points.data && points.data.LoyaltyPoints && points.data.LoyaltyPoints>0 ? points.data.LoyaltyPoints:0}`
      let instruction={
        endtransaction:false,
        bussnessId:this.connectioninfo.code,
        loyaltypoints:this.loyaltypoints
      }
      if(!this.OnCall)
      {
        this.socket.emit('endtransaction',instruction);
      }
    }
  },(error)=>{
    console.log('error in getLoyaltyPointsFun',error);
  })
 }

 submitOrderFun()
 {
  let instruction={
    endtransaction:true,
    bussnessId:this.connectioninfo.code
  }
  if(this.amount>0)
  {
    let data ={
      "transaction_amount":this.amount,
      "customer_id":this.clientInfo.id,
      "organization_id":this.connectioninfo.org_id,
      "customerVisitId":this.clientInfo.Customer_Visits[this.clientInfo.Customer_Visits.length-1].id,
    }
    if(this.clientInfo.total_loyalty_point && this.clientInfo.total_loyalty_point != 0 && this.selectedOfferData && this.selectedOfferData.loyalty_point < this.clientInfo.total_loyalty_point && this.selectedOffer)
    {
      if(!this.loyaltypoints)
      {
        this.redeemRewardFun();
      }
      console.log('Total points',this.clientInfo.total_loyalty_point)  //remove the points from user account
    }else{
      console.log('Else Total points',this.clientInfo.total_loyalty_point)
    }
    if(this.loyaltypoints>0)  // loyaltypoints which get according to the amount
    {
      console.log('getRedeemLoyaltyPoints called')
    this.apiService.getRedeemLoyaltyPoints(data).subscribe((info:any)=>{
      if(info && info.data)
      {
        if(this.clientInfo.total_loyalty_point && this.clientInfo.total_loyalty_point != 0 && this.selectedOfferData.loyalty_point < this.clientInfo.total_loyalty_point && this.selectedOffer)
        {  
          this.redeemRewardFun();
          console.log('Total points',this.clientInfo.total_loyalty_point)  //remove the points from user account
        }else{
          console.log('Else Total points',this.clientInfo.total_loyalty_point)
        }
        console.log('getRedeemLoyaltyPoints info',info);
        this.noUser=true; 
        this.availableUser=false; 
        if(!this.OnCall)
         {
           this.socket.emit('endtransaction',instruction);
         }
        this.router.navigateByUrl('/end-transactione');
        this.exitSession();
      }
    },error=>{
      if(this.clientInfo.total_loyalty_point && this.clientInfo.total_loyalty_point != 0 && this.selectedOfferData.loyalty_point < this.clientInfo.total_loyalty_point && this.selectedOffer)
      {  
        this.redeemRewardFun();
        console.log('Total points',this.clientInfo.total_loyalty_point)  //remove the points from user account
      }else{
        console.log('Else Total points',this.clientInfo.total_loyalty_point)
      }
      console.log('error in getRedeemLoyaltyPoints',error)
    })
  }else{
  if(!this.OnCall)
    {
      this.socket.emit('endtransaction',instruction);
    }
    this.exitSession();
    this.router.navigateByUrl('/end-transactione');
  }
  }else{
    console.log('Amount is EMPTY',this.amount);
  }
 }

 GetOrderOnCallInfoFun()
 {
  const OnCall =this.apiService.getLocalStorageData(constantKeys.onCall);
    const customerProfileinfo :any=this.apiService.getLocalStorageData(constantKeys.customerProfileinfo);
    console.log('On Call',OnCall)
    if(OnCall)
    {
      this.OnCall=true;

      console.log('customerProfileinfo',JSON.parse(customerProfileinfo));
      let data=JSON.parse(customerProfileinfo)
      if(data)
      {
        this.clientInfo=data.customerDetails
      }

      this.ShowDataFun(false,true); //this.noUser=false;this.availableUser=true;
    }else{
      this.ShowDataFun(true,false); //this.noUser=true;this.availableUser=false; 
      this.OnCall=false;
    }
    // console.log('On customerProfileinfo',customerProfileinfo)
 }
 ShowDataFun(noUser:boolean,availableUser:boolean)
 {
  this.noUser=noUser;
  this.availableUser=availableUser;
 }

 selectOffer(i:any)
 {
  if(this.OnCall)
  {
    console.log("selected offer id",i)
    this.selectedOffer=i.id;
    if(this.selectedOffer && this.rewardinfo)
    {
      this.selectedOfferData = this.rewardinfo.find(item => item.id === this.selectedOffer)
    }
  }
  }
  // resetSelection
  resetSelectionFun()
  {
    this.selectedOffer=0;
    let instruction={
      endtransaction:false,
      bussnessId:this.connectioninfo.code,
      resetselection:true
    }
    if(!this.OnCall)
    {
      this.socket.emit('endtransaction',instruction);
    }
  }
  disconectOnCall()
  {
    this.OnCall=false;
    localStorage.removeItem(constantKeys.onCall);
    localStorage.removeItem(constantKeys.customerProfileinfo);
    this.clientInfo=[];
  }
  async presentAlert(userId:any) {
    const alert = await this.alertController.create({
      header: 'Customer Side Intraction! Cencel will give you 1 min to stop the user Instraction message',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
            clearTimeout(this.timer);
            this.OnCallMs = false;
          this.timer = setTimeout(() => {
            this.OnCallMs = true;
        }, 60000);
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.OnCallMs = true;
            this.disconectOnCall();
            // get coming user data 
            if(userId)
            {
              let data={
                userId:userId
              }
                this.getuserinfoFun(data)
            }
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  redeemRewardFun()
 {
  console.log('selectedOffer',this.selectedOffer);
  let input={
    "reward_id":this.selectedOffer,
    "customer_id":this.clientInfo.id
   }
  this.apiService.redeemReward(input).subscribe((redeem:any)=>{
    console.log('redeem',redeem); //jk47
    let info={
      bussnessId:this.bussnessId,
      item:this.selectedOffer,
      userId:`${this.clientInfo && this.clientInfo.id ? this.clientInfo.id :''}`,
      
    }
    this.socket.emit('sendBussnessResponse',info);
    // this.updateuserinfo();
  },(error)=>{
    console.log('error',error)
  })
  // this.router.navigateByUrl('/transaction-end');
 }
}
