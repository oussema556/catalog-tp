import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  constructor(private fb: FormBuilder, private prodService:ProductService,private  router: Router) { }


  ngOnInit(): void {
    this.updateProductForm=this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      price: this.fb.control(null,[Validators.required,Validators.min(200)]),
      promotion: this.fb.control(false,[Validators.required]),
    })
  }
  handleUpdateProduct() {
    let product=this.updateProductForm.value;
    this.prodService.updateProduct(product).subscribe({
      next:(data)=>{
        alert("Product updated successfully")
        this.router.navigate(['products']);
      }, error:err => {
        console.log(err);
      }
    })
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if(error['required'])
    {
      return fieldName+ " is Required";
    }
    else if(error['minLength'])
    {
      return fieldName+" should have at least "+error['minLength']['requiredLength']+"Characters";
    }
    else if(error['min'])
    {
      return fieldName+" should have min value "+error['min']['min'];
    }
    else return "";
  }
}
