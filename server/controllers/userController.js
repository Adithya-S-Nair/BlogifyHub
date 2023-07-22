require("dotenv").config();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = (req, res) => {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    newUser.save()
        .then((response) => {
            jwt.sign({ userId: response._id, username }, process.env.JWT_SECRET, (err, token) => {
                if (err)
                    throw err
                res.cookie('token', token).status(201).json({ id: response._id, username });
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Error creating user' });
        });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({ msg: "User Not Found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Wrong password" });
        }
        const date = new Date()
        await User.updateOne({ email }, { $set: { lastLoggedInAt: date } });
        jwt.sign({ userId: userData._id, username: userData.username }, process.env.JWT_SECRET, (err, token) => {
            if (err)
                throw err
            res.cookie('token', token).status(201).json({ id: userData._id, username: userData.username });
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const logoutUser = (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "Successfully logged out" });
}

const home = (req, res) => {
    if (req.userId) {
        return res.status(200).json({ msg: 'Authorization successful', userId: req.userId, username: req.username });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    home
};