const mongoose = require('mongoose');
const bagcheckoutSchema =new mongoose.Schema({
   product:[],
    username : {
        type  : String,
    //    required : true
    },
   
   
    userid : {
        type : String,
        // required: true
    },


  

   imageurls :[]
 
  


 

} ,{
    timestamps : true,
})



module.exports = mongoose.model('Bagcheckout' , bagcheckoutSchema);