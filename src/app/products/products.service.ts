import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../types/Product";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private url: string = 'http://localhost:3000/products';

    constructor(private httpClient: HttpClient) {
    }

    retrieveAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.url);
    }
    
    retrieveById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${this.url}/${id}`);
    }

    deleteById(id: number): Observable<any> {
        return this.httpClient.delete(`${this.url}/${id}`);
    }
    
    save(product: Product): Observable<Product> {
        if (product.id) {
            return this.httpClient.put<Product>(`${this.url}/${product.id}`, product);
        } else {
            return this.httpClient.post<Product>(this.url, product);
        }
    }
}
