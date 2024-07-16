const multer=require('multer')

const vendors = require('../models/Vendors');

const products = require('../models/products');
const Firm=require('../models/firm');

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null,Date.now() + Path.extname( file.originalname)
                )
                }
});
const upload = multer({ storage: storage });

const addFirm=async(req,res)=>{
    try{
        const{firstname,area,category,region,offer
        }=req.body
        const image=req.file? req.file.filename:undefined;
    
    
        const vendors=await vendors.findById(req.vendorsId);
        if(!vendors){
            return res.status(404).json({message:"vendors not found"})
        }
         const firm =new Firm({
            firstname,
            area,
            
            category,
            region,
            offer,
            image,
            vendorsId:vendors._id
         })
         const savedFirm= await firm.save();
         vendors.Firm.push(savedFirm)
         await vendors.save();
         res.status(200).json({message:"firm added successfully"})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"firm did not add successfully"})
    } }
    const deletefirmById=async(req,res)=>{
        try{
            const firmId=req.params.firmId;
            const deletedfirm=await Firm.findByIdAndDelete(firmId);
            if(!deletedfirm){
                return res.status(400).json({message:'firm not found'});
            }
    
        }catch(err){
    
            res.status(400).json({message:'firm not found , internal server error'});
    
        }
    }
module.exports={addFirm:[upload.single('image'),addFirm],deletefirmById}

