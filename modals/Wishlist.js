const mongoose = require('mongoose');
const wishSchema =new mongoose.Schema({
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
    userid : {
        type : String,
        // required: true
    },
    price : {
        type  : Number,
    //    required : true
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



module.exports = mongoose.model('Wishlist' , wishSchema);