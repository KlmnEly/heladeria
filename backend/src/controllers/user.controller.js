const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all users', error: error.message });
        }
    },
    
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getById(id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error getting user', error: error.message });
        }
    },
    
    createUser: async (req, res) => {
        const { first_name, last_name, document_number, phone_number, address, email, password, role_id } = req.body;
        
        if (!role_id || !first_name || !last_name || !email || !password || !document_number || !phone_number) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        try {
            const existingUser = await User.getByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'Email already registered.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const userData = { ...req.body, password: hashedPassword };

            const newUserId = await User.create(userData);
            res.status(201).json({ message: 'User created successfully!', id: newUserId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { email, password } = req.body;

        try {
            if (email) {
                const existingUser = await User.getByEmail(email);
                if (existingUser && existingUser.id_user !== Number(id)) {
                    return res.status(409).json({ message: 'Email already registered.' });
                }
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            await User.update(id, req.body);
            res.status(200).json({ message: 'User updated successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await User.delete(id);

            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};

module.exports = userController;