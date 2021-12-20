const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const app = express();
const path = require("path");

app.use(expressLayouts);
app.set('views', './client');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "client")));

const register = require("./routes/auth/authrouter")
const dashboard = require("./routes/dashboard/dashboard");
const team = require("./routes/Team/team")
const profile = require("./routes/Profile/Profilerouter");
const attendence=require("./routes/dashboard/attendence")
// const login = require("./routes/login");
//cookie parser
app.use(cookieParser())
//Body Parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/", register)
app.use("/", dashboard);
app.use("/", team)
app.use("/profile", profile);
app.use("/attendence", attendence);
// app.use("/login",login)



const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server connected to port ${port}`)
})