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
    return res.sendStatus(400).json({ message: `${username} is not created` });
  }

  const matchedPassword = await brcypt.compare(password, currentUser.password);

  if (matchedPassword) {
    const token = jwt.sign(
      {
        user: {
          username: currentUser.username,
          role: currentUser.role,
        },
      },
      process.env.SECRET_KEY_TOKEN,
      { expiresIn: "20s" } //expires in 1 minute
    );

    const refreshToken = jwt.sign(
      {
        username: currentUser.username,
      },
      process.env.SECRET_KEY_REFRESH,
      { expiresIn: "10m" } //expires in 1 minute
    );
    currentUser.refreshToken = refreshToken;

    const newUserDB = usersDB.filter(
      (user) => user.username !== currentUser.username
    );
    newUserDB.push(currentUser);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(newUserDB)
    );

    res.cookie("refresh_jwt", refreshToken);
    res.status(200).json(token);
  } else {
    res.sendStatus(401);
  }
};

module.exports = loginController;