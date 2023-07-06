const brcypt = require("bcrypt");
const usersDB = require("../models/users.json");
const path = require("path");
const fsPromises = require("fs/promises");

const registerController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  if (usersDB.find((user) => user.username === username)) {
    return res.sendStatus(409);
  }

  const hashedPassword = await brcypt.hash(password, 5);
  const newUser = {
    username,
    password: hashedPassword,
  };
  usersDB.push(newUser);

  fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDB)
  );

  res.sendStatus(201);
};

module.exports = registerController;
