const express = require('express');
const router = express.Router();
const productcontroller = require('../controllers/productcontroller');
router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(path.join(__dirname,'../uploads/'+imagename));
});
router.delete('/:productId',productcontroller.deleteproductById)
router.post('/add-product/:firmId', productcontroller.addproduct);
router.get('/:firmId/products',productcontroller.getproductByFirm)
module.exports = router;
