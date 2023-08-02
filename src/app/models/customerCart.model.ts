import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class CustomerCart{
    id?: number;
	
	customer: Customer;
	
	product: Product;
	
	quantity: number;

	totalPrice: number;
}