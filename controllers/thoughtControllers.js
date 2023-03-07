const { User, Thought, Reaction } = require('../models');

const thoughtHandlers = {


  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json(err);
      });
  },
  

  getSingleThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },


  createThought(req, res) {
    Thought.create(req.body)
      .then(( thought) => {
        return User.findOneAndUpdate({ _id: req.body.userId },
          { $push: {thoughts: thought._id }},{new: true})
      })

      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },


  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },
  
 
  deleteThoughtById(req, res,) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "thought deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },


  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  deleteReaction(req, res) {
    console.log(req.params.thoughtId)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "nothing found" });
        }
        res.json(thought);
      })

     
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },
};

module.exports = thoughtController;