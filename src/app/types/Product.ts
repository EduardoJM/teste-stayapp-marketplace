
export interface Product {
    name: string;
    description: string;
    price: number;
    images: string[];
}

export const ProductEmpty : Product = {
    name: '',
    description: '',
    price: 1,
    images: [],
};
