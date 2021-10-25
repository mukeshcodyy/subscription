import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  RegisterForm!: FormGroup;
  totalchackbox:any;
  SubscriptionS:any;
  SubscriptionG:any;
  totalRs:any;
  ApiData:any;
  ProductListArray:any;
  ProductListArray0:any;
  totalArray:any;
  SearchArray:any;
  selection!:any;
  constructor(private toastr:ToastrService,private build:FormBuilder,private product:ProductsService,private ActivatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.listingData();
  }

  OnSubmit(form: any){
    this.filtercard(form)
  }
  filtercard(form: any){
    this.ProductListArray=[];
    this.ProductListArray0=[];
    this.ProductListArray0.push({"value":form.value.ussports,"name":"US Sports"},{"value":form.value.ausports,"name":"AU Sports"},{"value":form.value.eufootball,"name":"EU Football"},{"value":form.value.auhorser,"name":"AU Horse Racing"});
    if(form.value.silverW!="" || form.value.silverW!=false){
      this.ProductListArray.push({plan:"weekly",value:44.99});
      this.totalchackbox=0;
      this.ProductListArray0.forEach((item:any)=>{
        if(item.value==true){

          this.totalchackbox++;
        }
      })
      if(this.totalchackbox!=2){
        this.toastr.warning("Select Any two Packages !")
      }
    }else if(form.value.silverM!="" || form.value.silverM!=false){
      this.ProductListArray.push({plan:"monthly",value:139.99});

    }
if(form.value.goldw!="" || form.value.goldw!=false){
      this.ProductListArray.push({plan:"weekly",value:59.99});

    }else if(form.value.goldm!="" || form.value.goldm!=false){
      this.ProductListArray.push({plan:"monthly",value:189.99});

    }

    this.calltheApi();
  }
  Totally(form: any){
    this.totalArray=[];
    this.totalArray.push({"plan":"weekly","value":44.99,"key":form.value.silverW},
    {"plan":"monthly","value":139.99,"key":form.value.silverM},
    {"plan":"weekly","value":59.99,"key":form.value.goldw},
    {"plan":"monthly","value":189.99,"key":form.value.goldm})
    this.totalRs=0;
    this.totalArray.forEach((item:any)=>{
      if(item.key==true){
        this.totalRs +=item.value;
      }
    })
  }
  calltheApi(){
    this.ApiData=this.ProductListArray
    this.ProductListArray0.forEach((item:any)=>{
      if(item.value==true){
        this.ApiData.push(item);
      }
    })
    this.totalArray.forEach((item:any)=>{
      if(item.key==true){
        this.ApiData.push(item);
      }
    })
    if(this.totalchackbox==2){
      this.product.AddData(ApiManager.ADD_Subscription,this.ApiData).subscribe(response=>{
        this.router.navigate(['/listing/succes']);
        this.toastr.success("The subscription was successfully added.")
      },err=>{
        this.toastr.warning("Something went wrong !")

      })
    }
  }
  listingData(){
    this.SubscriptionS=[
      {plan:"weekly",value:44.99},
      {plan:"monthly",value:139.99}
    ]
    this.SubscriptionG=[
      {plan:"weekly",value:59.99},
      {plan:"monthly",value:189.99}
    ]
  }

}
