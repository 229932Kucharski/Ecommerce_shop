import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    if (hasCategoryId) {
      // get "id" param string and convert to number
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      // if no category, set default 1
      this.currentCategoryId = 1;
    }
    // get products for given id
    this.productService.getProdcutList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
