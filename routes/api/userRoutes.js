const router = require("express").Router();

const { 
  getAllUsers, 
  getSingleUser, 
  createUser, 
  deleteUser, 
  updateUser, 
  addFriend,
  deleteFriend, 

} = require ("../../controllers/userControllers");

router.route("/").get(getAllUsers);

router.route("/:userId").get(getSingleUser);

router.route("/").post(createUser);

router.route("/:userId").delete(deleteUser);

router.route("/:userId").put(updateUser);

 router.route("/:userId/friends/:friendId").post(addFriend);

router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;