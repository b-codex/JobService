const JobPost = require("../models/JobPost");
const User = require("../../../AccountService/src/models/userModel/UserModel");
const addJobPostToUser = async (jopPostID, postedByID) => {
  return await User.findByIdAndUpdate(
    postedByID,
    {
      $push: { jobsPosted: jopPostID },
    },
    { new: true }
  ).exec();
};

module.exports = {
  addJobPostToUser,
};
