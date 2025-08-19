const Role = require('../models/role.model');

const roleController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.getAll();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all roles', error: error.message });
        }
    },

    getRoleById: async (req, res) => {
        try {
            const role = await Role.getById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the role', error: error.message });
        }
    },

    createRole: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Role name is required field.' });
        }

        try {
            const newRoleId = await Role.create(req.body);
            res.status(201).json({ message: 'Role Created successful!', id: newRoleId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the role', error: error.message });
        }
    },

    updateRole: async (req, res) => {
        try {
            const { id } = req.params;
            await Role.update(id, req.body);
            res.status(200).json({ message: 'Role Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the role', error: error.message });
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { id } = req.params;
            await Role.delete(id);
            res.status(200).json({ message: 'Role Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the role', error: error.message });
        }
    }
};

module.exports = roleController;