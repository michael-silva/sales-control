
export class Product {
	code: number;
	name: string;
	brand: string;
	costValue: number;
	unitValue: number;
	unitOfMeasurement: UnitOfMeasurement = UnitOfMeasurement.Unit;
    stock: number = 1;
    stockRecommended: number = 1;

    static discount(value: number) {
        const d = new Product();
        d.code = 0;
        d.name = 'Desconto';
        d.unitValue = value;
        return d;
    }

    static warning(stock: number, stockRecommended: number) {
        const average = stockRecommended / 2;
        return stock < stockRecommended && stock > average;
    }

    static danger(stock: number, stockRecommended: number) {
        const average = stockRecommended / 2;
        return stock < average && stock >= 0;
    }

    hasWarning() {
        return Product.warning(this.stock, this.stockRecommended);
    }

    hasDanger() {
        return Product.danger(this.stock, this.stockRecommended);
    }
}

export enum UnitOfMeasurement {
	Unit = 'Unit',
	Kg = 'Kg',
	Mg = 'Mg',
	Ml = 'Ml'
}

export enum UnitOfMeasurementDescription {
	Unit = 'Unidade',
	Kg = 'Kilograma',
	Mg = 'Miligrama',
	Ml = 'Mililitro'
}
