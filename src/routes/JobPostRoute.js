const router = require("express").Router(),
  JobPost = require("../models/JobPost"),
  axios = require("axios"),
  { addJobPostToUser } = require("../controller/jobPostController");
// roles = require("../controller/roles"),
// { role_auth } = require("../controller/jobPostController");
/* This is a patch request to update a single post. */
router.patch("/:id", async (req, res) => {
  try {
    const post = await jobPost.findById(req.params.id);

    if (post.id === req.body.id) {
      try {
        const updatedPost = await JobPost.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your post !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create Post

/* This is a post request to create a new post. */
// the id params is the the logged-in user
router.post("/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    const newPost = new JobPost({
      ...req.body,
      postedBy: req.params.id,
    });
    // await addJob/PostToUser(newPost.id, req.params.id);
    const savedPost = await newPost.save();
    // console.log(savedPost.employee);
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err,
    });
  }
});

// Delete Post

/* This is a delete request to delete a single post. */
router.delete("/:id", async (req, res) => {
  try {
    const post = await JobPost.findById(req.params.id);

    if (post.id === req.body.id) {
      try {
        await post.delete();
        res.status(200).json("Post deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your post !");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Post
/* This is a get request to get a single post. */
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await JobPost.findById(req.params.id).exec();
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", user_auth, (req, res) => {
//   try {
//     JobPost.findById(req.params.id).then((jobpost) => {
//       if (jobpost) {
//         awaitaxios
//           .get(
//             "http://localhost:5655/microservice/accountService/users/" +
//               jobpost.postedBy
//           )
//           .then((response) => {
//             console.log(response);
//           });
//         res.send("Quick Response");
//       } else {
//         res.send("Invalid JobPost");
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// Get all posts
/* This is a get request to get all the posts. */
router.get("/", async (req, res) => {
  const companyName = req.query.company;
  const tag = req.query.tag;
  const jobType = req.query.jobType;
  // add location
  try {
    let posts;
    if (companyName) {
      posts = await JobPost.find({ companyName });
    } else if (tag) {
      posts = await JobPost.find({
        tag: {
          $in: [tag],
        },
      });
    } else if (jobType) {
      posts = await JobPost.find({
        jobType,
      });
    } else {
      posts = await JobPost.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
