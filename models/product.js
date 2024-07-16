const mongoose = require ('mongoose');
const Firm = require('./firm');
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    }
    ,price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]
    },
    image:{
        type:String,

    },bestseller:{
        type:String
    },description:{
        type:String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
});
const product =mongoose.model('product',productSchema)
module.exports=product;
