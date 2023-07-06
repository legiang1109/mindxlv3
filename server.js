require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 9999;
const path = require("path");
const handleVerifyJWT = require("./middlewares/handleVerifyJWT");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/", require("./routes/root"));


app.use("/register",  require("./routes/register"));
app.use("/login",  require("./routes/login"));

app.use(handleVerifyJWT)

app.use("/persons",  require("./routes/persons"));
app.listen(PORT, () => console.log(`server running ${PORT}`));
