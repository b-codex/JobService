const mongoose = require("mongoose"),
  moment = require("moment");
const ApplyForJobSchema = new mongoose.Schema(
  {
    jobPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    applyUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      default: "",
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: String,
      // default: "",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    dateApplied: {
      type: Date,
      default: moment.utc().valueOf(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyForJob", ApplyForJobSchema);
