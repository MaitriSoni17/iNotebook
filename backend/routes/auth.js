const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Maitri$soni";
// ROUT 1: Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() })
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken })
        // res.json(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUT 2: Authenticate a user using: POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    // body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUT 3: Get loggedin user using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUT 4: Update Details of loggedin user using: PUT "/api/auth/edituser". Login required
router.put('/edituser/:id', fetchuser, async (req, res) => {
    let success = false
    try {
        const { name, email, password } = req.body;
        let newDetails = {}
        if (name) {
            newDetails.name = name;
        }
        if (email) {
            newDetails.email = email;
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            success = false;
            return res.status(404).json({ success, error: "Not Found!!" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        user = await User.findByIdAndUpdate(req.params.id, { $set: newDetails });
        success = true;
        res.json({ success, user });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUT 5: Update Details of loggedin user using: PUT "/api/auth/editpassuser". Login required
router.put('/editpassuser/:id', fetchuser, async (req, res) => {
    let success = false
    try {
        const { name, email, password, npassword } = req.body;
        let newDetails = {}
        if (name) {
            newDetails.name = name;
        }
        if (email) {
            newDetails.email = email;
        }
        if (npassword) {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.npassword, salt);
            newDetails.password = secPass;
        }
        if (!password || !npassword) {
            return res.status(400).json({ success: false, error: "Old and new passwords are required" });
        }

        let user = await User.findById(req.params.id);
        if (!user) {
            success = false;
            return res.status(404).json({ success, error: "Not Found!!" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        user = await User.findByIdAndUpdate(req.params.id, { $set: newDetails });
        success = true;
        res.json({ success, user });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUT 6: Delete user using: DELETE "/api/auth/deleteuser". Login required
router.delete('/deleteuser/:id', fetchuser, async (req, res) => {
    let success = false
    try {
        const { password } = req.body;
        let user = await User.findById(req.params.id);
        if (!user) {
            success = false;
            return res.status(404).json({ success, error: "Not Found!!" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }
        notes = await Note.deleteMany({ user: req.params.id });
        user = await User.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, user, notes });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router