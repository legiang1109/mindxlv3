const usersDB = require("../models/users.json");
const jwt = require("jsonwebtoken");
const refreshController =(req,res,next) =>{

    const refresh_jwt = req.cookies?.refresh_jwt;
    if(!refresh_jwt)return res.sendStatus(401);

    const currentUser = usersDB.find((user) => user.refreshToken === refresh_jwt);

    if (!currentUser) return res.sendStatus(401)

    try{
        const decoded = jwt.verify(refresh_jwt,process.env.SECRET_KEY_REFRESH)

        if(decoded.username !== currentUser.username){
            res.sendStatus(401)
        }
        const token = jwt.sign(
            {
              username: currentUser.username,
            },
            process.env.SECRET_KEY_TOKEN,
            { expiresIn: "20s" } //expires in 1 minute
          );
          res.json(token);
    }catch(e){

    }

}

module.exports = refreshController