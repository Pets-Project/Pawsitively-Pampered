const { Pet, User } = require('../../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const petData = await Pet.findAll();
        res.status(200).json(petData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const petData = await Pet.findByPk(req.params.id);
        if (!petData) {
            res.status(404).json({ message: 'No pet found with this id!' });
            return;
        }
        res.status(200).json(petData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const petData = await Pet.create(req.body);
        res.status(200).json(petData);
    } catch (err) {
        res.status(400).json(err.message);
    }
});


router.post('/bulk', async (req, res) => {
    try {
        const pets = await Pet.bulkCreate(req.body);
        res.status(201).json(pets);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const petData = await Pet.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!petData[0]) {
            res.status(404).json({ message: 'No pet with this id!' });
            return;
        }
        res.status(200).json(petData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const petData = await Pet.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!petData) {
            res.status(404).json({ message: 'No pet with this id!' });
            return;
        }
        res.status(200).json(petData);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:petId/owner', async (req, res) => {
    try {
        const { petId } = req.params;
        const pet = await Pet.findByPk(petId);

        if (pet) {
            const ownerId = pet.owner_id;
            const owner = await User.findByPk(ownerId);
            if (owner) {
                res.send(owner);
            } else {
                res.status(200).send(`Could not find owner with ID ${ownerId}.`);
            }
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
});


router.get("/owner/:ownerId", async (req, res) => {
    try {
        const { ownerId } = req.params;
        const pets = await Pet.findAll({
            where: {
                owner_id: ownerId,
            },
        });
        const owner = await User.findOne({
            where: {
                id: ownerId,
            },
        });
        res.json({
            owner: {
                ...owner.dataValues,
                pets
            }
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
})


module.exports = router;