const Product =require('../models/product');
const multer=require('multer');
const Firm=require('../models/firm')


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
const addproduct=async(req,res)=>{
    try{
        const{productname,price,category,bestseller,description}=req.body;
        const image=req.file? req.file.filename:undefined;
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(400).json({message:'Firm not found'});
        }
        const product=new Product({productname,price,category,bestseller,description,image
            ,firm:firm._id});
            const savedproduct=await product.save();
            firm.products.push(savedproduct);
            await firm.save();
            res.status(200).json({message:'Product added successfully'});
}catch(error){
    res.status(400).json({message:'Product not added'});

}
}
const getproductByFirm=async(req,res)=>{
    try{
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId) 
        if(!firm){
            return res.status(400).json({message:'Firm not found'});
        }
        const restaurentname=firm.firmname;
        const products=await Product.find({firm : firmId});
        res.status(200).json({restaurentname,products});
    }catch(error){
        res.status(400).json({message:'Product not found'});



    }
}
const deleteproductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deletedproduct=await Product.findByIdAndDelete(productId);
        if(!deletedproduct){
            return res.status(400).json({message:'Product not found'});
        }

    }catch(err){

        res.status(400).json({message:'Product not found , internal server error'});

    }
}

module.exports={addproduct:[upload.single('image'),addproduct],getproductByFirm,deleteproductById};