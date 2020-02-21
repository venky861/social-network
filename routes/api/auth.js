const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

// @route           api/auth
// @description     test
// @acess           private

router.get("/", auth, async (req, res) => {
  try {
    const userdata = await User.findById(req.user.id).select("-password")

    res.json(userdata)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
})

// @route           api/auth
// @description     test
// @acess           public

router.post(
  "/",
  [
    check("email", "Email should not be empty").isEmail(),

    check("password", "Please enter a password")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      //check user exist in db or not
      const usermail = await User.findOne({ email })

      if (!usermail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email doesn't exist" }] })
      }

      //password de-crypt

      const isMatch = await bcrypt.compare(password, usermail.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] })
      }

      const payload = {
        user: {
          id: usermail.id
        }
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err

          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err)
      res.status(500).send("Server error")
    }
  }
)

module.exports = router
