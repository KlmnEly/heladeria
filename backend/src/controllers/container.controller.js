const Container = require('../models/container.model');

const containerController = {
    getAllContainers: async (req, res) => {
        try {
            const containers = await Container.getAll();
            res.json(containers);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all containers', error: error.message });
        }
    },

    getContainerById: async (req, res) => {
        try {
            const container = await Container.getById(req.params.id);
        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }
        res.json(container);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the container', error: error.message });
        }
    },

    createContainer: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Container name is required field.' });
        }

        try {
            const newContainerId = await Container.create(req.body);
            res.status(201).json({ message: 'Container Created successful!', id: newContainerId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the container', error: error.message });
        }
    },

    updateContainer: async (req, res) => {
        try {
            const { id } = req.params;
            await Container.update(id, req.body);
            res.status(200).json({ message: 'Container Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the container', error: error.message });
        }
    },

    deleteContainer: async (req, res) => {
        try {
            const { id } = req.params;
            await Container.delete(id);
            res.status(200).json({ message: 'Container Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the container', error: error.message });
        }
    }
};

module.exports = containerController;