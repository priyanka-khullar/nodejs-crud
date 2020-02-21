const Product = require('../Models/Product');
const db = require('../../migration');

module.exports = {
	productStore: (req, res) => {
		const data = {
			name: req.body.name,
			desc: req.body.desc,
			price: req.body.price,
		}

		const product = new Product(data);
		db.query(product.addProduct(), (err, result) => {
			if (err) {
				res.status(400).json({
					'error': err.message,
				})
			};

			res.status(200).json({
				'data': result,
			});
		});
	},

    productsLists: (req, res, next) => {
    	db.query(Product.getAllProducts(), (err, result) => {
    		if (err) {
    			res.status(400).json({
    				'error': err.message,
    			})
    		}

    		res.status(200).json({
    			'data': result,
    		});
    	})
    },

    getProductById: (req, res, next) => {
    	const id = req.params.id;
    	db.query(Product.getProductById(id), (err, result) => {
    		if(err) {
    			res.status(404).json({
    				'error': err.message,
    			});
    		}

    		res.status(200).json({
    			'data': result[0],
    		});
    	})
    },

    deleteProduct: (req, res, next) => {
    	const id = req.params.id;
    	db.query(Product.deleteProductById(id), (err, result) => {
    		if (err) {
    			res.status(404).json({
    				'error': err.message,
    			});
    		}

    		res.status(200).json({
    			'message': 'Product deleted successfully.',
    		});
    	})
    }
}