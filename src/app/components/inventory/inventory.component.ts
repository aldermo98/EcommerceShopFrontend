import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

import { VendorService } from '../../services/vendor.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventory:Product[] = [];
  product:Product;
  categories:Category[] = [];
  userId:number;
  role: string;

  alertMessage:string;

  constructor(private vendorService: VendorService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    //get inventory
    sessionStorage.setItem("vendorId", localStorage.getItem("id"));  //TODO assign vendorId dynamically on login
    this.userId = parseInt(sessionStorage.getItem("vendorId")!);
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.vendorService.getInventory(this.userId).subscribe((products) => {
      this.inventory = products;
    });
  }

  addProduct(): void{
    this.product = {
      productName: <string>$('#addProduct_name').val(),
      price: <number>$('#addProduct_price').val(),
      quantity: <number>$('#addProduct_qty').val(),
      vendorId: +localStorage.getItem("id")!,
      category: {
        id: $('#categories option').filter(function() {
            return (<HTMLOptionElement>this).value == $('#addProduct_category').val();
        }).attr('categoryId'),
        name: <string>$('#addProduct_category').val()!
      }
    }
    this.vendorService.addProduct(this.product).subscribe(() => {
      this.inventory.push(this.product);
      this.alertMessage = "Product has been added.";
      $('#successMessage').fadeToggle(0,"linear", ()=>{
        $('#successMessage').fadeToggle(5000)
      });
      $('.addProduct_form input').val("");
    })
  }

  editProduct(productId:number): void{
    this.product = {
      id: productId,
      productName: <string>$(`#${productId}_name`).val(),
      price: <number>$(`#${productId}_price`).val(),
      quantity: <number>$(`#${productId}_qty`).val(),
      vendorId: +sessionStorage.getItem("vendorId")!,
      category: {
        id: $('#categories option').filter(function() {
          return (<HTMLOptionElement>this).value == $(`#${productId}_category`).val();
        }).attr('categoryId'),
        name: <string>$(`#${productId}_category`).val()!
      }
    }

    this.vendorService.editProduct(this.product).subscribe(() => {
      this.alertMessage = "Product has been modified.";
      $('#successMessage').fadeToggle(0,"linear", ()=>{
        $('#successMessage').fadeToggle(5000)
      });
    })
  }

  deleteProduct(productId:number): void{
    this.vendorService.deleteProduct(productId).subscribe(() => {
      this.inventory = this.inventory.filter(p => p.id != productId );
      this.alertMessage = "Product has been deleted.";
      $('#successMessage').fadeToggle(0,"linear", ()=>{
        $('#successMessage').fadeToggle(5000)
      });
    })
  }

  filterInventory(filterBy:string):void{
    let queryParam:string = <string>$('#queryParam').val();
    this.vendorService.getInventory(this.userId, filterBy, queryParam).subscribe((products) => {
      this.inventory = products;
    });
  }

}
