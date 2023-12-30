const mongoose = require('mongoose');
const addressSchema =new mongoose.Schema({
    buyer : {
        type  : String,
    //    required : true
    },
    contactno : {
        type  : Number,
    //    required : true
    },
    address : {
        type  : String,
    //    required : true
    },
    city : {
        type  : String,
    //    required : true
    },
    zipcode : {
        type  : Number,
    //    required : true
    },
   
    userid : {
        type  : String,
    //    required : true
    },
    state : {
        type  : String,
    //    required : true
    },
   
    
    

} ,{
    timestamps : true,
})



module.exports = mongoose.model('Addresses' , addressSchema);