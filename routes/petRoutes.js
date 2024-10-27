const express = require('express');
const Pet = require('../backend/models/Pet');
const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const { name, animal, breed, age, location, sex } = req.body;

        if (!name || !animal || !breed || age === undefined || !location || !sex) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newPet = await Pet.create(req.body);
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error in POST /api/pets:', error);
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Pet.update(req.body, {
            where: { id: req.params.id }
        });

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        const updatedPet = await Pet.findByPk(req.params.id);
        res.status(200).json(updatedPet);
    } catch (error) {
        console.error('Error in PUT /api/pets:', error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (error) {
        console.error('Error retrieving all pets:', error);
        res.status(500).json({ error: 'An error occurred while retrieving pets.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (error) {
        console.error('Error retrieving pet by ID:', error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const petId = req.params.id;
    const deleted = await Pet.destroy({ where: { id: petId } });

    if (deleted) {
        console.log(`Deleted pet with ID: ${petId}`);
        return res.status(204).send();
    }
    console.log(`Pet with ID: ${petId} not found`);
    return res.status(404).json({ error: 'Pet not found' });
});



module.exports = router;
