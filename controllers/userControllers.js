const { User, Thought } = require('../models');

const controllerVoodoo = {

  // gets all users
  getAllUsers(req,res){
    User.find()
    .then(function(users)
    {
      res.json(users);
    })
    .catch(function(err){
      console.error(err);
      res.status(404).json(err);
    })
  },

  // gets a single user
  getSingleUser(req,res){
    User.findOne({_id:req.params.userId})
    .populate('thoughts')
    .then(function(user)
    {
      if (!user){
        return res.status(404).json({message: "no user found with this id"});
      }
      res.json(user);
    })
    .catch(function(err){
      console.error(err);
      res.status(404).json({message: err})
    })
  },

  // creates a new user
  createUser(req,res){
    User.create(req.body)
    .then(function(user){
      res.json(user);
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // updatse auser
  updateUser(req,res){
    User.findByIdAndUpdate({_id:req.params.userId}, req.body, {new:true})
    .then(function(user){
      if (!user){
        return res.status(404).json({message: "no user with that id"})
      }
      res.json(user);
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // deletes a user
  deleteUser(req,res){
    User.findByIdAndDelete({_id:req.params.userId})
    .then(function(user){
      if (!user){
        return res.status(404).json({message: "no user with that id"})
      }
      res.json({message: "user deleted"});
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // adds new friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({message: "no user found with that id"});
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "no such user found" })
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err })
      });
  }
};

module.exports = controllerVoodoo