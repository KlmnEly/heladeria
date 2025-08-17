const pool = require('./db');

const Product = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ?', [id]);
        return rows[0];
    },

    create: async (product) => {
        const { name, price, description } = product;
        const [result] = await pool.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
        return result.insertId;
    },

    update: async (id, product) => {
        const { name, price, description } = product;
        await pool.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id_product = ?', [name, price, description, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM products WHERE id_product = ?', [id]);
        return true;
    }
};

module.exports = Product;