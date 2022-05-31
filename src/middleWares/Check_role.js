const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const check_role = (inputRole) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err && user.role !== inputRole) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

module.exports = check_role;
