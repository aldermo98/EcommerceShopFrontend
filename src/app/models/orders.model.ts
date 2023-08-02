import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class Orders{
    id?:number;
    customer:Customer;
    product:Product;
    quantity:number;
    purchaseDate?:Date;
}

