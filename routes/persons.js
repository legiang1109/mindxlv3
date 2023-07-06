const express = require("express");
const app =express();
const router = express.Router();
const path = require("path");
const fsPromises = require("fs/promises");
const fs = require("fs");
const {getAllPerson,createPerson,updatePerson,deletePerson} = require("../controllers/personControllers");
const checkRequiredName = require("../middlewares/checkRequiredName");



router.get("/", getAllPerson);


app.use(checkRequiredName);
router.post("/", createPerson)
router.put("/", updatePerson)
router.delete("/",deletePerson )

router.get('/:name',(req,res) =>{
    res.json({name: req.params.name})
})

module.exports = router;