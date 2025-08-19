const pool = require('./db');

const Container = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM containers');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM containers WHERE id_container = ?', [id]);
        return rows[0];
    },

    create: async (container) => {
        const { name } = container;
        const [result] = await pool.query('INSERT INTO containers (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, container) => {
        const { name } = container;
        await pool.query('UPDATE containers SET name = ? WHERE id_container = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM containers WHERE id_container = ?', [id]);
        return true;
    }
};

module.exports = Container;