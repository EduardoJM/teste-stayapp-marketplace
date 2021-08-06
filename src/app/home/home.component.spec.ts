import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { MarketPlaceDetailsComponent } from "../core/market-place-details/market-place-details.component";
import { NavBarComponent } from "../core/navbar/navbar.component";
import { HomeComponent } from "./home.component";

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
            ],
            declarations: [
                HomeComponent,
                MarketPlaceDetailsComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a MarketPlaceDetailsComponent', () => {
        const details = fixture.debugElement.query(By.css('app-market-place-details'));
        expect(details).toBeTruthy();
    });

    it('should have a h1 with title', () => {
        const title = fixture.debugElement.query(By.css('h1'));
        expect(title).toBeTruthy();
        const titleText = (title.nativeElement as Element).textContent;
        expect(titleText).toBe('Market-Place');
    });
});
