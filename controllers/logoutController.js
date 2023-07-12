const usersDB = require("../models/users.json");
const path = require("path");
const fsPromises = require("fs/promises");
const jwt = require("jsonwebtoken");


async function logoutController(req,res){
    //clear token
    // res.clearCookies("refresh_jwt")
    // res.sendStaus(200)
    const cookies = req.cookies
    if(!cookies || !cookies.refresh_jwt) return res.sendStatus(200)
    const currentUser = usersDB.find(
        (user) => user.refreshToken === cookies.refresh_jwt
    )
    if(!currentUser) return res.sendStatus(200)

    const newUsersDB = usersDB.map(user => user.refreshToken === cookies.refresh_jwt ? {...user, refreshToken:""} : user)
    await fsPromises.writeFile(
        path.join(__dirname,"../models","users.json"),JSON.stringify(newUsersDB)
    )
    res.clearCookie("refresh_jwt");
    res.sendStatus(200) 

}

module.exports =logoutController