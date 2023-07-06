const brcypt = require("bcrypt");
const usersDB = require("../models/users.json");
const path = require("path");
const fsPromises = require("fs/promises");
const jwt = require("jsonwebtoken");

const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const currentUser = usersDB.find((user) => user.username === username);

  if (!currentUser) {
    return res.Status(400).json({ message: `${username} is not created` });
  }

  const matchedPassword = await brcypt.compare(password, currentUser.password);

  if (matchedPassword) {
    const token = jwt.sign(
      {
        username: currentUser.username,
      },
      process.env.SECRET_KEY_TOKEN
    );
    console.log(token)
    res.status(200).json(token);
  } else {
    res.sendStatus(401);
  }
};

module.exports = loginController;
