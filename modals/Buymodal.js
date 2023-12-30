const mongoose = require('mongoose');
const buySchema =new mongoose.Schema({
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
    state : {
        type  : String,
    //    required : true
    },
    zipcode : {
        type  : Number,
    //    required : true
    },
    productname : {
        type  : String,
    //    required : true
    },
    userid : {
        type  : String,
    //    required : true
    },
    price : {
        type  : Number,
    //    required : true
    },
   
    description:{
        type:String,
    },
    status:{
        type:String , default : 'Confirmed'
       }
    ,
    payment:{
        type:String,
    }
    ,
    products :[]

  

  
 
  


 

} ,{
    timestamps : true,
})



module.exports = mongoose.model('sells' , buySchema);