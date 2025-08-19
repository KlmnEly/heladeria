const Customer = require('../models/customer.model');

const customerController = {
    getAllCustomers: async (req, res) => {
        try {
            const customers = await Customer.getAll();
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all customers', error: error.message });
        }
    },

    getCustomerById: async (req, res) => {
        try {
            const customer = await Customer.getById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the customer', error: error.message });
        }
    },

    createCustomer: async (req, res) => {
        const { first_name, last_name, document_number, phone_number, address, email } = req.body;

        if (!first_name || !last_name) {
            return res.status(400).json({ message: 'Customer names are required fields.' });
        }

        try {
            const newCustomerId = await Customer.create(req.body);
            res.status(201).json({ message: 'Customer Created successful!', id: newCustomerId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the customer', error: error.message });
        }
    },

    updateCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            await Customer.update(id, req.body);
            res.status(200).json({ message: 'Customer Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the customer', error: error.message });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            await Customer.delete(id);
            res.status(200).json({ message: 'Customer Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the customer', error: error.message });
        }
    }
};

module.exports = customerController;