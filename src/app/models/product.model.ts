import { Category } from "./category.model";

export class Product{
    id?: number;
    productName: string;
    name?: string;
    price?: number;
    quantity?: number;
    category:Category;
    vendorId?: number;
    vendorName?: string;
}

export class Stat{
    productName: string;
    price : number;
    quantity: number;
    vendorName : string; 
    
}

export class SingleProduct{
    id? : number;
    productname?: string;
    price?: number;
    quantity?: number;
    categoryName?: string;
    
}