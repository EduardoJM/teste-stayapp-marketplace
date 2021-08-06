import { PricePipe } from "./price.pipe";

describe('PricePipe', () => {
    const pipe = new PricePipe();

    it('transforms 0 to "R$ 0.00"', () => {
        expect(pipe.transform(0)).toBe('R$ 0.00');
    });

    it('transforms 50 to "R$ 50.00"', () => {
        expect(pipe.transform(50)).toBe('R$ 50.00');
    });

    it('transforms 1.99 to "R$ 1.99"', () => {
        expect(pipe.transform(1.99)).toBe('R$ 1.99');
    });
});
