import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { NavBarComponent } from "./navbar.component";

describe('NavBarComponent', () => {
    let fixture: ComponentFixture<NavBarComponent>;
    let component: NavBarComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                CollapseModule,
                RouterTestingModule,
            ],
            declarations: [
                NavBarComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should brand render', () => {
        const brand = fixture.debugElement.query(By.css('.navbar-brand'));
        expect((brand.nativeElement as Element).textContent).toBe('Market-Place');
    });

    it('should toggler present', () => {
        const toggler = fixture.debugElement.query(By.css('.navbar-toggler'));
        expect(toggler).toBeTruthy();
    });

    it('should toggler click change isCollapsed value', () => {
        expect(component.isCollapsed).toBeTruthy();
        const toggler = fixture.debugElement.query(By.css('.navbar-toggler'));
        toggler.triggerEventHandler('click', null);
        expect(component.isCollapsed).toBeFalse();
    });

    it('should items visible only if toggler is hidden or if isCollapsed if false', () => {
        const toggler = fixture.debugElement.query(By.css('.navbar-toggler')).nativeElement as Element;
        const togglerIsVisible = window.getComputedStyle(toggler).display !== 'none';
        const navbar = fixture.debugElement.query(By.css('.navbar-collapse'));
        
        if (!togglerIsVisible) {
            // if the toggler is not visible, the items must be have a flex display
            // this display flex is from bootstrap
            expect(
                window.getComputedStyle(
                    navbar.nativeElement as HTMLElement
                ).display
            ).toBe('flex');
        } else {
            // if the toggler is visible, the items must be have a none or block display
            // this display block or none is from bootstrap
            component.isCollapsed = true;
            fixture.detectChanges();

            expect(
                window.getComputedStyle(
                    navbar.nativeElement as HTMLElement
                ).display
            ).toBe('none');

            component.isCollapsed = false;
            fixture.detectChanges();

            expect(
                window.getComputedStyle(
                    navbar.nativeElement as HTMLElement
                ).display
            ).toBe('block');
        }
    });
});
