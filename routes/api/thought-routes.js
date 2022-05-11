const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    newThought,
    deleteThought
} = require('../../controllers/thought');

router.route('/:thoughtId').post(getAllThoughts);

router
.route('/:thoughtId/userId')
.put(newThought)
.delete(deleteThought);

router.route('/:thoughtId/:userId/:newThought').delete(deleteThought);

module.exports = router;