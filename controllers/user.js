const { User } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v',
        })
        .select('-__v')
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    createUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Invalid User Id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    newFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'Invalid Thought ID!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },

      deleteUser({ params }, res) {
          User.findOneAndDelete({ _id: params.id})
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      }
      
};

module.exports = userController;