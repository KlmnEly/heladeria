const Product = require('../models/product.model');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all products', error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the product', error: error.message });
        }
    },

    createProduct: async (req, res) => {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Product name and price are required fields.' });
        }
        
        if (typeof name !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ message: 'The name and description must be text type.' });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ message: 'The price myst be a positive number' });
        }

        try {
            const newProductId = await Product.create(req.body);
            res.status(201).json({ message: 'Product Created successful!', id: newProductId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the product', error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.update(id, req.body);
            res.status(200).json({ message: 'Product Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the product', error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.delete(id);
            res.status(200).json({ message: 'Product Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the product', error: error.message });
        }
    }
};

module.exports = productController;