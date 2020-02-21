const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const { check, validationResult } = require("express-validator")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

// @route           api/users
// @description     register user
// @acess           public

router.post(
  "/",
  [
    check("name", "Name should not be empty")
      .not()
      .isEmpty(),

    check("email", "Email should not be empty").isEmail(),

    check("password", "Password should contain atleast 5 characters").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //check user exist in db or not
      const usermail = await User.findOne({ email })

      if (usermail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "E-mail id already exist" }] })
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      })

      //create User
      user = new User({
        name,
        email,
        password,
        avatar
      })

      //password encrypt

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err

          user.password = hash
          user.save()
        })
      )

      const payload = {
        user: {
          id: user.id
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
