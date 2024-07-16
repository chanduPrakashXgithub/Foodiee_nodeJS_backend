const mongoose = require('mongoose')
const vendors = require('./Vendors');
const product = require('./product');
const firmschema=new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg ','non-veg']
            }
        ],
        
    },
    region:{
        type:[{
            type:String,
            enum:['north-indian','south-indian','east-indian','west-indian']
        }]
    },
    image:{
        type:String,

    },
    vendors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendors'
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
    
});
const Firm=mongoose.model('Firm',firmschema)
module.exports=Firm;