const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator")
const request = require("request")
const config = require("config")
const Post = require("../../models/Post")

// @route           api/profile/me
// @description     Get current user profile
// @acess           private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar", "email"])

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for such user" })
    }

    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send("Server error")
  }
})

// @route           api/profile/    post request
// @description     Get current user profile
// @acess           private

router.post(
  "/",
  [
    auth,
    check("skills", "skills is required")
      .not()
      .isEmpty(),
    check("status", "status is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) {
      profileFields.company = company
    }
    if (website) profileFields.website = website
    if (bio) profileFields.bio = bio
    if (location) profileFields.location = location
    if (status) profileFields.status = status

    if (githubusername) profileFields.githubusername = githubusername

    if (skills) {
      const x = skills.split(",")
      console.log(x)
      profileFields.skills = x.map(skill => skill.trim())
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }

      profile = new Profile(profileFields)
      await profile.save()

      console.log(profile)
      res.json(profile)
    } catch (err) {
      //try ends here

      console.log(err)
      res.status(500).send("server error")
    }
  }
)

// @route           api/profile/ get request all profile
// @description     Get current user profile
// @acess           public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"])
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

// @route           api/profile/user/:user_id get request all profile
// @description     Get single user profile
// @acess           public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"])

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" })
    }

    res.json(profile)
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "profile not found" })
    }
    console.log(err)
    res.status(500).send("server error")
  }
})

// @route           api/profile
// @description     Delete single user
// @acess           private

router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id })
    await Profile.findOneAndRemove({ user: req.user.id })

    await User.findOneAndRemove({ _id: req.user.id })

    res.send("User and profile deleted")
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

// @route           api/profile/experience post request
// @description     update experience profile
// @acess           private

router.put(
  "/experience",
  [
    auth,
    check("title", "title is required")
      .not()
      .isEmpty(),
    check("company", "company is required")
      .not()
      .isEmpty(),
    check("from", "from is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      profile.experience.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (err) {
      //try ends here

      console.log(err)
      res.status(500).send("server error")
    }
  }
)

// @route           api/profile/experience/:user_id
// @description     Delete experience field
// @acess           private

router.delete("/experience/:user_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    removeIndex = profile.experience
      .map(items => items.id)
      .indexOf(req.params.user_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

// @route           api/profile/education post request
// @description     update education profile
// @acess           private

router.put(
  "/education",
  [
    auth,
    check("school", "title is required")
      .not()
      .isEmpty(),
    check("degree", "company is required")
      .not()
      .isEmpty(),
    check("from", "from is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "from is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      profile.education.unshift(newEdu)

      await profile.save()

      res.json(profile)
    } catch (err) {
      //try ends here

      console.log(err)
      res.status(500).send("server error")
    }
  }
)

// @route           api/profile/education/:user_id
// @description     Delete education field
// @acess           private

router.delete("/education/:user_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    removeIndex = profile.education
      .map(items => items.id)
      .indexOf(req.params.user_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

// @route           api/profile/github/:user
// @description      pull github user profile
// @acess           public

router.get("/github/:user", async (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${
        req.params.user
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "get",
      headers: { "user-agent": "node.js" }
    }

    request(options, (err, response, body) => {
      if (err) throw err
      if (response.statusCode !== 200)
        res.status(400).json({ msg: "No github profile found" })

      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.log(err)
    res.status(500).send("server error")
  }
})

module.exports = router
