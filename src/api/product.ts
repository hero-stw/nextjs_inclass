import { Product } from "@/types/product";
import instance from "./instance";

export const addProduct = (product: Product) => {
    return instance.post("/products", product)
}

export const getAllProducts = () => {
    return instance.get("/products");
}

export const getProduct = (id : number) => {
    return instance.get("/products/"+id);
}
export const deleteProduct = (id : number) => {
    return instance.delete("/products/"+id);
}

export const updateProduct = (id: number, product: any) => {
    return instance.put("/products/"+id, product)
}