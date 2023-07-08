require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 9999;
const path = require("path");
const handleVerifyJWT = require("./middlewares/handleVerifyJWT");
const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(cookieParser())

app.use("/", require("./routes/root"));


app.use("/register",  require("./routes/register"));
app.use("/login",  require("./routes/login"));
app.use('/refreshToken',require("./routes/refreshToken"))

app.use(handleVerifyJWT)

app.use("/persons",  require("./routes/persons"));
app.listen(PORT, () => console.log(`server running ${PORT}`));