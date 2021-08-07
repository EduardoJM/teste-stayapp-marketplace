import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product, ProductEmpty } from 'src/app/types/Product';
import { DetailProductComponent } from './detail-product.component';
import { throwError, of } from 'rxjs';
import { ProductService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { AlertModule } from 'ngx-bootstrap/alert';

describe('DetailProductComponent', () => {
    let fixture: ComponentFixture<DetailProductComponent>;
    let component: DetailProductComponent;
    let productService = jasmine.createSpyObj('ProductService', ['retrieveById']);
    let activatedRoute: ActivatedRouteStub;
    let router = jasmine.createSpyObj('Router', ['navigate']);

    const expectedProduct: Product = {
        id: 1,
        description: 'Testing Description',
        images: ['Testing Image'],
        name: 'Testing Name',
        price: 42,
        rating: 4,
    };

    beforeEach(async () => {
        productService = jasmine.createSpyObj('ProductService', ['retrieveById', 'save']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        activatedRoute = new ActivatedRouteStub();
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                AlertModule,
            ],
            declarations: [
                DetailProductComponent,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: ProductService, useValue: productService },
                { provide: Router, useValue: router },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailProductComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load correct product using valid id as parameters map', () => {
        productService.retrieveById.and.returnValue(of(expectedProduct));
        activatedRoute.setParamMap({ id: 1 });
        fixture.detectChanges();
        expect(component.product).toEqual(expectedProduct);
    });

    it('should has a empty product using not id in parameters map', () => {
        expect(component.product).toEqual(ProductEmpty);
    });

    it('should display a error message and has an empty product if product is not loaded from id', () => {
        productService.retrieveById.and.returnValue(throwError('error!'));
        activatedRoute.setParamMap({ id: 1 });
        fixture.detectChanges();
        expect(component.product).toEqual(ProductEmpty);
        expect(component.error).toBe('Não foi possível obter os dados do servidor!');
    });

    it('should a alert rendered if error is not null', () => {
        component.error = "Testing";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('alert[type=danger]'))).toBeTruthy();
    });

    it('should call save method with sucess must be redirect to /products', () => {
        productService.save.and.returnValue(of(expectedProduct));
        component.product = expectedProduct;
        fixture.detectChanges();
        const submit = fixture.debugElement.query(By.css('button[type=submit]'));
        submit.triggerEventHandler('click', null);
        const spy = router.navigate as jasmine.Spy;
        expect(spy.calls.count()).toEqual(1);
        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toEqual(['/products']);
    });
});
