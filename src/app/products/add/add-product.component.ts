import { Component } from "@angular/core";
import { Product, ProductEmpty } from "../../types/Product";

@Component({
    templateUrl: './add-product.component.html',
    styleUrls: [
        './add-product.component.scss'
    ]
})
export class AddProductComponent {
    product: Product = { ...ProductEmpty };
    count: Number[] = new Array(this.product.images.length);

    save(): void {
        console.log(this.product);
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
