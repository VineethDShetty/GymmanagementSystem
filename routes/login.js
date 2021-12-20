const express = require("express");
const router = express.Router()


router.get("/", async (req, res) => {
    console.log(11)
    res.send("Login22")
})





module.exports = router;