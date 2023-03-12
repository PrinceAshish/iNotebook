const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ASHISHISGOODBOY";
const fetchUser = require("../middleware/fetchUser");

router.post(
  "/createUser",
  [
    body("name", "Enter valid Name").isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email is already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("user created suucessfully");
      success = true;
      res.send({ success, authToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "password can't be Empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try using  correct Credencial" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try using correct Credencial" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("you enterd our system");
      success = true;
      res.send({ success, authToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

router.post("/user", fetchUser, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
