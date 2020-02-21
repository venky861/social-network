const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const { check, validationResult } = require("express-validator")
const Post = require("../../models/Post")
const User = require("../../models/User")
const Profile = require("../../models/Profile")

// @route           api/post
// @description     add post
// @acess           private

router.post(
  "/",
  [
    auth,
    check("text", "Text field is requird")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id)

      const newPost = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      }

      let post = new Post(newPost)

      await post.save()

      res.json(post)
    } catch (err) {
      console.log(err)
      res.status(500).send("Server error")
    }
  }
)

// @route           api/post
// @description     get  all post
// @acess           private

router.get("/", auth, async (req, res) => {
  try {
    let post = await Post.find().sort({ date: -1 })

    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(400).send("Server error")
  }
})

// @route           api/post
// @description     get  single post
// @acess           private

router.get("/:userid", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.userid)

    if (!post) {
      return res.status(400).json({ msg: "no post found" })
    }

    res.json(post)
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "no post found" })
    }
    console.log(err)
    res.status(400).send("Server error")
  }
})

// @route           api/post
// @description     delete single post
// @acess           private

router.delete("/:userid", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.userid)

    if (!post) {
      return res.status(400).json({ msg: "no post found" })
    }

    // check user belongs to the respective post

    if (post.user.toString() !== req.user.id) {
      return res
        .status(400)
        .locationjson({ msg: "you are not authorized to delete this post" })
    }

    await post.remove()
    res.send("post removed")
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "no post found" })
    }
    console.log(err)
    res.status(400).send("Server error")
  }
})

// @route           api/post/like/:userid
// @description     like post put request
// @acess           private

router.put("/like/:userid", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.userid)

    if (
      post.likes.filter(likes => likes.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "already liked" })
    }

    await post.likes.unshift({ user: req.user.id })

    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.log(err)
    res.status(400).send("Server error")
  }
})

// @route           api/post/unlike/:userid
// @description     like post put request
// @acess           private

router.put("/unlike/:userid", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.userid)

    if (
      post.likes.filter(likes => likes.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "you have not liked" })
    }

    //remove index

    let removeIndex = post.likes
      .map(likes => likes.user.toString())
      .indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.log(err)
    res.status(400).send("Server error")
  }
})

// @route           api/post/comments/:userid
// @description     add post
// @acess           private

router.post(
  "/comments/:user_id",
  [
    auth,
    check("text", "Text field is requird")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id)
      const post = await Post.findById(req.params.user_id)

      const newPost = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      }

      post.comments.unshift(newPost)

      await post.save()

      res.json(post.comments)
    } catch (err) {
      console.log(err)
      res.status(500).send("Server error")
    }
  }
)

// @route         Delete   api/post/comments/:id/:comment_id
// @description     add post
// @acess           private

router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)

    let comments = post.comments.find(
      comments => comments.id === req.params.comment_id
    )

    // comment exits or not

    if (!comments) {
      return res.status(404).json({ msg: "comment does not exist" })
    }

    if (comments.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User not authorized to delete" })
    }

    let removeIndex = post.comments
      .map(comments => comments.id)
      .indexOf(req.params.comment_id)

    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json(post.comments)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
})

module.exports = router
