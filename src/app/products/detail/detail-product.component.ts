import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product, ProductEmpty } from "../../types/Product";
import { ProductService } from "../products.service";

@Component({
    templateUrl: './detail-product.component.html',
    styleUrls: [
        './detail-product.component.scss'
    ]
})
export class DetailProductComponent implements OnInit {
    product: Product = { ...ProductEmpty };
    count: Number[] = new Array(this.product.images.length);
    error?: string = undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
    ) {}

    ngOnInit(): void {
        const rawId = this.activatedRoute.snapshot.paramMap.get('id');
        if (!rawId) {
            return;
        }
        const productId = Number(rawId);
        this.productService.retrieveById(productId).subscribe({
            next: (prod) => {
                this.product = prod;
                this.count = new Array(this.product.images.length);
            },
            error: () => {
                this.error = "Não foi possível obter os dados do servidor!";
            }
        })
    }

    save(): void {
        this.productService.save(this.product).subscribe({
            next: () => {
                this.router.navigate(['/products']);
            },
            error: () => {
                this.error = "Não foi possível salvar os dados!";
            }
        });
    }

    addImage(): void {
        this.product.images.push('');
        this.count = new Array(this.product.images.length);
    }

    removeImage(index: number): void {
        this.product.images = this.product.images.filter((_, i) => i !== index);
        this.count = new Array(this.product.images.length);
    }
}
