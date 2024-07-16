const vendorcontroller=require("../controllers/vendorscontroller");
const express=require("express");
const router=express.Router();
router.post('/register',vendorcontroller.vendorsRegister);
router.post('/login',vendorcontroller.vendorsLogin);
router.get('/all-vendors',vendorcontroller.getAllvendors);
router.get('/single-vendor/:id',vendorcontroller.getvendorsById)
module.exports=router;