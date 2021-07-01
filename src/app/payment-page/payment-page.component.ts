import { Component, HostListener, OnInit } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  constructor(private paymentservice: PaymentServiceService) { }

  ngOnInit(): void {
  }

  options = {
    "key": "rzp_test_zXkzTrohP6YPtO", // Enter the Key ID generated from the Dashboard
    "amount": "00000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "For text",
    "description": "Test Transaction demo",
    "image": "https://logo.clearbit.com/spotify.com",
    // "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (res: any) {
      // alert(res.razorpay_payment_id);
      // alert(res.razorpay_order_id);
      // alert(res.razorpay_signature)
      // console.log('handler',res.razorpay_payment_id);
      // this.checksuccessfulpayment(res)
      var event = new CustomEvent("payment.success", 
            {
                detail: res,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    },
    "prefill": {
      "name": "Ajay Kumar",
      "email": "ajay.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  pay() {
    this.options.amount = "1090"
    // let rzp1 = new this.paymentservice.nativeWindow.Razorpay(this.options); // use service se
    let rzp1 = new Razorpay(this.options);
    rzp1.on('payment.failed', function (res: any) {
      console.log(res);
      //   alert(res.error.code);
      //   alert(res.error.description);
      //   alert(res.error.source);
      //   alert(res.error.step);
      //   alert(res.error.reason);
      //   alert(res.error.metadata.order_id);
      //   alert(res.error.metadata.payment_id);
    });
    rzp1.open();
    
  }
  @HostListener('window:payment.success', ['$event']) 
  onPaymentSuccess(event:any): void {
    console.log('onPaymentSuccess',event);
    
    // this.orderService.updateOrder(event.detail).subscribe(
    // data => {
    //     this.paymentId = data.message;
    // }
    // ,
    // err => {
    //     this.error = err.error.message;
    // }
    // );
}
  checksuccessfulpayment(payid:any){
    console.log(payid);
    
  }
}

