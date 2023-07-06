const express = require("express");
const router = express.Router();
const path = require("path");
const fsPromises = require("fs/promises");
const fs = require("fs");

router.get("/", async (req, res) => {
  const data = await fsPromises.readFile(
    path.join(__dirname, "..","views", "index.html"),
    "utf-8"
  );
  res.send(data);
});

module.exports = router;
