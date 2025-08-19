const pool = require('./db');

const Flavor = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM flavors');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM flavors WHERE id_flavor = ?', [id]);
        return rows[0];
    },

    create: async (flavor) => {
        const { name } = flavor;
        const [result] = await pool.query('INSERT INTO flavors (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, flavor) => {
        const { name } = flavor;
        await pool.query('UPDATE flavors SET name = ? WHERE id_flavor = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM flavors WHERE id_flavor = ?', [id]);
        return true;
    }
};

module.exports = Flavor;