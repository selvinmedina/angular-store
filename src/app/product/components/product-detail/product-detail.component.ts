import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ProductsService } from "./../../../core/services/products/products.service";
import { Product } from "./../../../core/models/product.model";
import { switchMap } from "rxjs/operators/";
import { Observable } from "rxjs";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.product$ = this.route.params.pipe(
      switchMap((params: Params) => this.productsService.getProduct(params.id))
    );
  }

  createProduct() {
    const newProduct: Product = {
      id: "222",
      title: "nuevo desde angular",
      image: "assets/images/banner-1.jpg",
      price: 3000,
      description: "nuevo producto"
    };
    this.productsService.createProduct(newProduct).subscribe(product => {
      console.log(product);
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: "edicion titulo"
    };
    this.productsService
      .updateProduct("2", updateProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  deleteProduct() {
    this.productsService.deleteProduct("222").subscribe(rta => {
      console.log(rta);
    });
  }

  getRandomUsers() {
    this.productsService.getRandomUsers().subscribe(
      users => console.log(users), //Exito
      error => console.log(error) //Error
    );
  }

  getFile() {
    this.productsService.getFile().subscribe(content => {
      var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "hello sdff.txt");
    });
  }
}
