
export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    rating?: number;
}

export const ProductEmpty : Product = {
    name: '',
    description: '',
    price: 1,
    images: [],
};
