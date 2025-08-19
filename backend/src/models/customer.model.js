const pool = require('./db');

const Customer = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM customers');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM customers WHERE id_customer = ?', [id]);
        return rows[0];
    },

    create: async (customer) => {
        const { first_name, last_name, document_number, phone_number, address, email } = customer;
        const [result] = await pool.query('INSERT INTO customers (first_name, last_name, document_number, phone_number, address, email) VALUES (?, ?, ?)', [first_name, last_name, document_number, phone_number, address, email]);
        return result.insertId;
    },

    update: async (id, customer) => {
        const { first_name, last_name, document_number, phone_number, address, email } = customer;
        await pool.query('UPDATE customers SET first_name = ?, last_name = ?, document_number = ?, phone_number = ?, address = ?, email = ? WHERE id_customer = ?', [first_name, last_name, document_number, phone_number, address, email, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM customers WHERE id_customer = ?', [id]);
        return true;
    }
};

module.exports = Customer;