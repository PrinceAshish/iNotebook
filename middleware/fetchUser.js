const jwt = require("jsonwebtoken");
const JWT_SECRET = "ASHISHISGOODBOY";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ err: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: err.message });
  }
};
module.exports = fetchUser;
