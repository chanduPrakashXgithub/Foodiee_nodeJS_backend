const Vendors = require('../models/Vendors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

console.log('Secret Key (from middleware):', secretKey); // Add this line to verify

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'Token is required' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded:', decoded);

        const vendor = await Vendors.findById(decoded.vendorsId);
        if (!vendor) {
            return res.status(404).json({ error: 'No vendor found with this ID' });
        }

        req.vendorsId = vendor._id;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
