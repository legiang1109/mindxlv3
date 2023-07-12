const express = require("express");
const app =express();
const router = express.Router();
const path = require("path");
const fsPromises = require("fs/promises");
const fs = require("fs");
const {getAllPerson,createPerson,updatePerson,deletePerson} = require("../controllers/personControllers");
const verifyRole = require("../middlewares/verifyRole");
const { ROLES } = require("../constants/roles");



router.get("/", verifyRole(ROLES.USER), getAllPerson);

router.use(verifyRole(ROLES.ADMIN))
router.post("/", createPerson)
router.put("/", updatePerson)
router.delete("/",deletePerson )

// router.get('/:name',(req,res) =>{
//     res.json({name: req.params.name})
// })

module.exports = router;