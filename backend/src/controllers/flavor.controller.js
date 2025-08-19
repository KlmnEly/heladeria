const Flavor = require('../models/flavor.model');

const flavorController = {
    getAllFlavors: async (req, res) => {
        try {
            const flavors = await Flavor.getAll();
            res.json(flavors);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all flavors', error: error.message });
        }
    },

    getFlavorById: async (req, res) => {
        try {
            const flavor = await Flavor.getById(req.params.id);
        if (!flavor) {
            return res.status(404).json({ message: 'Flavor not found' });
        }
        res.json(flavor);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the flavor', error: error.message });
        }
    },

    createFlavor: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Flavor name is required field.' });
        }

        try {
            const newFlavortId = await Flavor.create(req.body);
            res.status(201).json({ message: 'Flavor Created successful!', id: newFlavortId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the flavor', error: error.message });
        }
    },

    updateFlavor: async (req, res) => {
        try {
            const { id } = req.params;
            await Flavor.update(id, req.body);
            res.status(200).json({ message: 'Flavor Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the flavor', error: error.message });
        }
    },

    deleteFlavor: async (req, res) => {
        try {
            const { id } = req.params;
            await Flavor.delete(id);
            res.status(200).json({ message: 'Flavor Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the flavor', error: error.message });
        }
    }
};

module.exports = flavorController;