const pool = require('./db');

const User = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    },
    
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id]);
        return rows[0];
    },
    
    getByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    
    create: async (user) => {
        const { role_id, first_name, last_name, document_number, phone_number, address, email, password } = user;
        const [result] = await pool.query(
            'INSERT INTO users (role_id, first_name, last_name, document_number, phone_number, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [role_id, first_name, last_name, document_number, phone_number, address, email, password]
        );
        return result.insertId;
    },

    update: async (id, user) => {
        const { role_id, first_name, last_name, document_number, phone_number, address, email } = user;
        await pool.query(
            'UPDATE users SET role_id = ?, first_name = ?, last_name = ?, document_number = ?, phone_number = ?, address = ?, email = ? WHERE id_user = ?',
            [role_id, first_name, last_name, document_number, phone_number, address, email, id]
        );
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
        return true;
    }
};

module.exports = User;