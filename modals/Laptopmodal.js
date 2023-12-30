const mongoose = require('mongoose');
const laptopSchema =new mongoose.Schema({
    name : {
        type  : String,
    //    required : true
    },
    price : {
        type : Number,
        // required: true
    },
    catagory : {
        type  : String,
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

   imageurls :[],
   currentbooking : [],

  reviews:{
    type:String,
  },
  sold:{
    type:Number,
  }


 

} ,{
    timestamps : true,
})



module.exports = mongoose.model('laptops' , laptopSchema);