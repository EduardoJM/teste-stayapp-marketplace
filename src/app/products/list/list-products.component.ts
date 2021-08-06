import { Component, OnInit, TemplateRef } from "@angular/core";
import { Product } from "src/app/types/Product";
import { ProductService } from "../products.service";
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
    providers: [
        {
            provide: CarouselConfig,
            useValue: {
                interval: 4000,
                noPause: true,
                showIndicators: true
            }
        }
    ]    
})
export class ListProductsComponent implements OnInit {
    modalRef!: BsModalRef;

    products: Product[] = [];
    deleteProduct: Product | null = null;
    error?: string = undefined;

    rate_test_now: number = 3; // TODO: get this from mocked data
    
    constructor(
        private productService: ProductService,
        private modalService: BsModalService,
    ) {}

    ngOnInit(): void {
        this.productService.retrieveAll().subscribe({
            next: (products) => this.products = products,
            error: () => this.error = 'Não foi possível obter os dados do servidor.',
        });
    }

    delete(template: TemplateRef<any>, product: Product) {
        this.deleteProduct = product;
        this.modalRef = this.modalService.show(template);
    }

    confirmDelete(): void {
        if (!this.deleteProduct || !this.deleteProduct.id) {
            return;
        }
        this.productService.deleteById(this.deleteProduct.id).subscribe({
            next: () => {
                this.productService.retrieveAll().subscribe({
                    next: (products) => this.products = products,
                    error: () => this.error = 'Não foi possível obter os dados do servidor.',
                });
            },
        });
        this.modalRef.hide();
    }
     
    declineDelete(): void {
        this.deleteProduct = null;
        this.modalRef.hide();
    }    
}
