const jwt = require("jsonwebtoken");
const usersDB = require("../models/users.json");

const handleVerifyJWT = (req, res, next) => {
    console.log(req.headers.authorization);
  const token = req.headers?.authorization?.split(" ")?.[1];
  if (!token) return res.sendStatus(401);
  try {
    const { user: {username ,role } } = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

    const currentUser = usersDB.find(user => user.username === username);
    if (!currentUser) return res.sendStatus(401);
    req.role =role
    next();
  } catch (e) {
    return res.sendStatus(401).json({ message: e.message});
  }
};

module.exports = handleVerifyJWT;