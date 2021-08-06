import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { BrowserModule, By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { MarketPlaceDetailsComponent } from "./market-place-details.component";

describe('MarketPlaceDetailsComponent', () => {
    let fixture: ComponentFixture<MarketPlaceDetailsComponent>;
    let component: MarketPlaceDetailsComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
            ],
            declarations: [
                MarketPlaceDetailsComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarketPlaceDetailsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a button for each step', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button.step'));
        buttons.forEach((button) => {
            const numberText = (button.query(By.css('.number')).nativeElement as Element).textContent;
            const number = Number(numberText);
            expect(number).toBeGreaterThan(0);
            expect(number).toBeLessThanOrEqual(component.steps.length);
            const step = component.steps[number - 1];
            const name = (button.query(By.css('.text')).nativeElement as Element).textContent;
            expect(name).toBe(step.name);
        });
    });

    it('should click in a button must change the currentStep', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button.step'));
        buttons.forEach((button) => {
            const numberText = (button.query(By.css('.number')).nativeElement as Element).textContent;
            const number = Number(numberText);
            expect(number).toBeGreaterThan(0);
            expect(number).toBeLessThanOrEqual(component.steps.length);
            const stepIndex = number - 1;
            button.triggerEventHandler('click', null);
            expect(component.currentStep).toBe(stepIndex);
        });
    });

    it('should the rendered informations of the right panel must be the informations of currentStep', () => {
        component.steps.forEach((step, index) => {
            component.currentStep = index;
            fixture.detectChanges();

            const title = fixture.debugElement.query(By.css('.description h2')).nativeElement as Element;
            const description = fixture.debugElement.query(By.css('.description h5')).nativeElement as Element;
            const button = fixture.debugElement.query(By.css('.description a.btn'));

            expect(title.textContent?.trim()).toBe(step.title);
            expect(description.textContent?.trim()).toBe(step.text);
            if (step.hasButton) {
                expect(button).toBeTruthy();
                expect((button.nativeElement as Element).textContent?.trim()).toBe(step.buttonText);
            }
        });
    });
});
