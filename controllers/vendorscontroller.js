const vendors = require('../models/Vendors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretkey = process.env.SECRET_KEY;

const vendorsRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorsemail = await vendors.findOne({ email });
        if (vendorsemail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendors = new vendors({
            username,
            email,
            password: hashedPassword
        });

        await newVendors.save();
        res.status(201).json({ message: "Vendor registered successfully" });
        console.log('Registered');
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

const vendorsLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const vendor = await vendors.findOne({ email });
        if (!vendor) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ vendorsId: vendor._id }, secretkey, { expiresIn: '1h' });
        res.status(200).json({ success: 'Login successful', token });
        console.log(email, "this is token", token);
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};
const getAllvendors=async(req,res)=>{
    try {
        const vendors=await vendors.find().populate('firm');
        res.status(200).json(vendors);
    }catch(err){
        console.error("Error during login:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}
const getvendorsById=async(req,res)=>{
    const vendorsId=req.params.id;
    try {
        const vendors=await vendors.findById(vendorsId);
        if(!vendor){
            return res.status(404).json({message:"Vendor not found"})
        }
        res.status(200).json(vendors);
    }catch(err){
        console.error("Error during login:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });

    }

}

module.exports = { vendorsRegister, vendorsLogin,getAllvendors,getvendorsById };
