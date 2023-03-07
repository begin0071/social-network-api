const { User, Thought, Reaction } = require('../models');

// Controller object containing functions for handling thoughts
const controlThoughts = {

  // Function to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json(err);
      });
  },
  

  // Function to get a single thought
  getSingleThought(req, res) {
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



  // Function to create a new thought and associate it with the user who created it
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


  // Function to update a thought
  updateThought(req, res) {
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
  


// Function to delete a thought and remove it from the associated user's thoughts array

  deleteThought(req, res,) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }


        // Find the associated user and pull the thought's id from their thoughts array

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



  // Function to add a reaction to a thought
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

// Function to delete a reaction from a thought

  deleteReaction(req, res) {
    console.log(req.params.thoughtId)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
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
};

module.exports = controlThoughts;