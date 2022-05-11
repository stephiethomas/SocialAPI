const { Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts({ params, body }, res) {
        console.log(params);
        Comment.create(body)
          .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { comments: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: 'user',
            select: '-__v',
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      // add Thought
      newThought({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { replies: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    
      // remove thought
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { comments: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    //   // remove reply
    //   removeThought({ params }, res) {
    //     Thought.findOneAndUpdate(
    //       { _id: params.thoughtId },
    //       { $pull: { replies: { thoughtId: params.thoughtId } } },
    //       { new: true }
    //     )
    //       .then(dbThoughtData => res.json(dbThoughtData))
    //       .catch(err => res.json(err));
    //   }
};

module.exports = thoughtController;
