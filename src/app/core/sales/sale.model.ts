import { Product } from '../products/product.model';

export class Sale {
    id: number;
    total: number = 0;
    date: Date = new Date();
    items: SaleItem[] = [];
    discount: number = 0;
    paymentForm: PayementForm = PayementForm.Money;

    get dateString() {
        if(typeof(this.date) === 'string') this.date = new Date(this.date);
        return `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}`;
    }

    sumTotal() {
        if(this.items.length === 0) return 0;
        return this.items.map(p => p.total).reduce((a, b) => a + b) - this.discount;
    }
}


export class SaleItem {
    product: Product;
    amount: number;

    get total() {
        return this.amount * this.product.unitValue;
    }
}


export enum PayementForm {
	Money = 'Money',
	CreditCard = 'CreditCard',
	DebitCard = 'DebitCard',
	Credit = 'Credit'
}

export enum PayementFormDescription {
	Money = 'Dinheiro',
	CreditCard = 'Cartão de crédito',
	DebitCard = 'Cartão de débito',
	Credit = 'Fiado'
}
