import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { of, throwError } from "rxjs";
import { StayAppPipes } from "src/app/shared/pipes/stay-app-pipes.module";
import { Product } from "../../types/Product";
import { ProductService } from "../products.service";
import { ListProductsComponent } from "./list-products.component";

describe('ListProductsComponent', () => {
    const expectedProducts: Product[] = [
        {
            id: 1,
            description: 'Testing Description',
            images: ['Testing Image'],
            name: 'Testing Name',
            price: 42,
            rating: 4,
        },
    ];
    let productService = jasmine.createSpyObj('ProductService', ['retrieveAll']);
    let fixture: ComponentFixture<ListProductsComponent>;
    let component: ListProductsComponent;

    beforeEach(async () => {
        productService = jasmine.createSpyObj('ProductService', ['retrieveAll']);
        productService.retrieveAll.and.returnValue(of(expectedProducts));

        await TestBed.configureTestingModule({
            imports: [
                ModalModule,
                RouterTestingModule,
                AlertModule,
                StayAppPipes,
            ],
            declarations: [
                ListProductsComponent,
            ],
            providers: [
                { provide: ProductService, useValue: productService },
                { provide: BsModalService, useValue: {} }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListProductsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load the products lists from the service', () => {
        expect(component.products).toEqual(expectedProducts);
    });

    it('should show a error if the products not loaded', () => {
        productService.retrieveAll.and.returnValue(throwError('error!'));
        fixture = TestBed.createComponent(ListProductsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        expect(component.products).toEqual([]);
        expect(component.error).toEqual('Não foi possível obter os dados do servidor.');
    });
});
