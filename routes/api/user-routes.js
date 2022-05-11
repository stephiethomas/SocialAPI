const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    // newFriend,
    deleteUser
} = require('../../controllers/user');

router
.route('/')
.getAllUsers
.post(createUser);

router
.route('/')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;

