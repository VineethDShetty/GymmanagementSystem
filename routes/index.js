const express = require("express");
const router = express.Router()


router.get("/", async (req, res) => {
    console.log(11)
    res.send("Welcome")
})





module.exports = router;