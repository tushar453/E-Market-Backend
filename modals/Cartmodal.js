const mongoose = require('mongoose');
const cartSchema =new mongoose.Schema({
    name : {
        type  : String,
    //    required : true
    },
    username : {
        type  : String,
    //    required : true
    },
    productid : {
        type  : String,
    //    required : true
    },
    price : {
        type  : Number,
    //    required : true
    },
    userid : {
        type : String,
        // required: true
    },
        stars:{
    type: Number,
    // required : true
   },

   description:{
    type: String,
    // required : true
   },

   imageurls :[]
 
  


 

} ,{
    timestamps : true,
})



module.exports = mongoose.model('cart' , cartSchema);