import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/products")
def retrieve_all_products():
    file = open('./database.json', 'r')
    json_file = json.load(file)
    file.close()
    return json_file['products']

@app.get("/products/{id}")
def retrieve_product_by_id(id: int):
    file = open('./database.json', 'r')
    json_file = json.load(file)
    file.close()
    products = json_file['products']
    for product in products:
        if product['id'] == id:
            return product
    raise HTTPException(status_code=404, detail="Produto não encontrado")

@app.delete("/products/{id}")
def delete_product_by_id(id: int):
    file = open('./database.json', 'r')
    json_file = json.load(file)
    file.close()
    new_products = []
    products = json_file['products']
    for product in products:
        if product['id'] == id:
            continue
        new_products += [product]
    file = open('./database.json', 'w')
    json.dump({
        "products": new_products
    }, file)
    file.close()
    return {}

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    images: Optional[List[str]] = []

    def get_serialized(self):
        data = {}
        if self.name is not None:
            data['name'] = self.name
        if self.description is not None:
            data['description'] = self.description
        if self.price is not None:
            data['price'] = self.price
        if self.images is not None:
            data['images'] = self.images
        return data

@app.put("/products/{id}")
def delete_product_by_id(id: int, item: ProductUpdate):
    file = open('./database.json', 'r')
    json_file = json.load(file)
    file.close()
    products = json_file['products']
    new_products = []
    for product in products:
        if product['id'] == id:
            new_products += [
                {
                    **product,
                    **item.get_serialized(),
                }
            ]
            continue
        new_products += [product]
    file = open('./database.json', 'w')
    json.dump({
        "products": new_products
    }, file)
    file.close()
    return {}
