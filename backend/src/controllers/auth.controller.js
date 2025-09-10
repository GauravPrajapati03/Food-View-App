const UserModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;
    try {
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token);

        res.status(201).json({ msg: 'User created successfully', newUser });
    } catch (err) {
        console.log(`Registering user error: `, err);
        res.status(500).json({ msg: err.message });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const User = await UserModel.findOne({ email });
        if (!User) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, User.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token);

        res.status(200).json({ msg: 'User logged in successfully', User });
    } catch (err) {
        console.log(`Logging in user error: `, err);
        res.status(500).json({ msg: err.message });
    }
}

const getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await UserModel.findById(id);
        if (!User) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User profile fetched successfully', User });
    } catch (err) {
        console.log(`User profile error: `, err);
        res.status(500).json({ msg: err.message });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: 'User logged out successfully' });
}


async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;

    try {
        const isExistingFoodPartner = await foodPartnerModel.findOne({ email });
        if (isExistingFoodPartner) {
            return res.status(400).json({ msg: 'Food partner already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFoodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token);

        res.status(201).json({ msg: 'Food partner created successfully', id: newFoodPartner._id, name: newFoodPartner.name, email: newFoodPartner.email });
    } catch (err) {
        console.log(`Registering food partner error: `, err);
        res.status(500).json({ msg: err.message });
    }
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    try {
        const foodPartner = await foodPartnerModel.findOne({ email });
        if (!foodPartner) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token);

        res.status(200).json({ msg: 'Food partner logged in successfully', id: foodPartner._id, name: foodPartner.name });
    } catch (err) {
        console.log(`Logging in food partner error: `, err);
        res.status(500).json({ msg: err.message });
    }
}

function logoutFoodPartner(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({ msg: 'Food partner logged out successfully' });
    } catch (error) {
        console.log(`Logging out food partner error: `, error);
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { registerUser, loginUser, getProfile, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };