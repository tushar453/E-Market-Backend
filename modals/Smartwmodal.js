const mongoose = require('mongoose');
const watchSchema =new mongoose.Schema({
    name : {
        type  : String,
    //    required : true
    },
    catagory : {
        type  : String,
    //    required : true
    },
    price : {
        type : Number,
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



module.exports = mongoose.model('smartwatch' , watchSchema);