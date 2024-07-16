const express=require('express')
const firmcontroller=require('../controllers/Firmcontroller')
const verifyToken=require('../middlewares/verifyToken')

const router =express.Router();
router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(path.join(__dirname,'../uploads/'+imagename));
});
router.post('/add-firm',verifyToken,firmcontroller.addFirm);
router.delete('/:firmId',firmcontroller.deletefirmById)


module.exports=router;
