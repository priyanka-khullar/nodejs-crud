const db = require('../../migration');

class Product {

	constructor(data) {
		this.name = data.name;
		this.desc = data.desc;
		this.price = data.price;
	}

	addProduct() {
		return `INSERT INTO products(name, descriptions, price) \
		VALUES('${this.name}','${this.desc}', '${this.price}')`;
	}

	updateProduct(id) {
		return `UPDATE products SET name = '${this.name}', descriptions = '${this.desc}', price = '${this.price}' WHERE id = ${id}`;
	}

	static getProductById(id) {
		return `SELECT * FROM products WHERE id = ${id}`;
	}

	static deleteProductById(id) {
		return `DELETE FROM products WHERE id = ${id}`;
	}

	static getAllProducts() {
		return `SELECT * FROM products`;
	}
}

module.exports = Product;