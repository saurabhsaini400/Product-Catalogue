import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product ={
    productName :"",
    productDescription: "",
    productBrand: "",
    productPrice: 0,
    productImages: []

  } 
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm){
    // console.log(this.product);

    const productFromData = this.prepareFormData(this.product);
    this.productService.addProduct(productFromData).subscribe(
      (respose: Product) => {
        console.log(respose);
        productForm.reset();
      },
      (error:HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData{
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type: 'application/json'})
    );
      for(var i = 0; i< product.productImages.length;i++){
        formData.append(
          'imageFile',
          product.productImages[i].file,
          product.productImages[i].file.name
        );
      }
    return formData;
  }

  onFileSelected(event){
    console.log(event);
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
    }
  }

  
}
