const brcypt = require("bcrypt");
// const usersDB = require("../models/users.json");
// const path = require("path");
// const fsPromises = require("fs/promises");
const UserModel = require("../models/UsersModel");


 

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await UserModel.findOne({username})
  console.log(foundUser);
  if(!foundUser) return res.sendStatus(409);
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  // if (usersDB.find((user) => user.username === username)) {
  //   return res.sendStatus(409);
  // }

  const hashedPassword = await brcypt.hash(password, 5);
  const newUser = {
    username,
    password: hashedPassword,
  };
  await UserModel.create(newUser)

  // không  sử dụng đẩy vào users.json nữa
  // usersDB.push(newUser);

  // fsPromises.writeFile(
  //   path.join(__dirname, "..", "models", "users.json"),
  //   JSON.stringify(usersDB)
  // );

  res.sendStatus(201);
};

module.exports = registerController;