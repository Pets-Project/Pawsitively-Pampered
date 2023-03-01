const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/profile', async (req, res) => {
    try {
        const petData = await Pet.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(petData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/profile/:petid', async (req, res) => {
    try {
        // Extract the petId from the request parameters
        const petid = req.params.petid;

        // Extract the pet data from the request body
        const petData = req.body;

        // Find the pet with the specified userId
        const pet = await Pet.findByPk(petid);

        if (!pet) {
            // If the pet is not found, send a 404 response
            return res.status(404).send(`User ${petid} not found`);
        }

        // Update the pet with the specified userId using the userData
        await pet.update(petData);

        // Send a response indicating that the pet was updated
        res.send(`User ${petid} updated successfully`);
    } catch (error) {
        // If an error occurs, send a 500 response
        res.status(500).send(`Error updating user ${petid}: ${error.message}`);
    }
});

router.delete('/:petid', async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.petid
        }
      });
  
      if (!petData) {
        res.status(404).json({ message: 'No pet info found with this id!' });
        return;
      }
  
      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;