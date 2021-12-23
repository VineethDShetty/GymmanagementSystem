/**
 * This router contains all the authentication Router
 *  like Login and Register
 */


const express = require("express");
const router = express.Router();
const autocontroller = require("../../controllers/auth/authcontroller");

const { body } = require("express-validator");
// validtion body for registration 
const registerValidators = [
    // Check if the email exists and is a valid email
    body("email")
        .exists()
        .withMessage("Please provide an email")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email")
        .bail()
        .normalizeEmail(),

    

    // Check if a password of 6-20 characters exists
    body("password")
        .exists()
        .withMessage("Please provide a password")
        .bail()
        .isAlphanumeric()
        .isLength({ min: 6, max: 20 })
        .withMessage("Provide Password of length 6-20"),
// check if name is provided
    body("name")
        .isString()
        .withMessage("Please Provide Proper Name"),
// Check if phoneno is provided
    body("phoneno")
        .isNumeric()
        .isLength({ min: 10, max: 10 })
    .withMessage("Please Provide Valid Phone number")
];
//Validation body for Login
const loginvalidators = [
    // Check if the email exists and is a valid email
    body("email")
        .exists()
        .withMessage("Please provide an email")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email")
        .bail()
        .normalizeEmail(),



    // Check if a password of 6-20 characters exists
    body("password")
        .exists()
        .withMessage("Please provide a password")
        .bail()
        .isAlphanumeric()
        .isLength({ min: 6, max: 20 })
        .withMessage("Provide Password of length 6-20"),

];

// Router to render the home Page 
router.get('/', (req, res) => res.render('homepage.ejs', { layout: false }));

// Router  to register the user with  all the details entered in registration page
router.post("/register", registerValidators,async (req, res) => {
    try {

        await autocontroller.register(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})
// Router to render the login Page 
router.get('/login', (req, res) => res.render('login', { layout: false }));
// Router to render the register Page 
router.get('/register', (req, res) => res.render('registration', { layout: false }));
// Router  to login the user with  all the details entered in registration page
router.post("/login", loginvalidators, async (req, res) => {
    try {
        await autocontroller.login(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})
//Router to logout the user 
router.get("/logout", async (req, res) => {
    await autocontroller.logout(req, res);

    
})




module.exports = router;