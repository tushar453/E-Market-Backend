const mongoose =  require("mongoose");
const userModal = mongoose.Schema({
    name :{
        type : String
    },
    email :{
        type : String
    },password :{
        type : String
    }
    ,
    
   isAdmin:{
    type:Boolean , default:false
   },
   isVerified:{
    type:Boolean , default:false
   },

     
},
{
    timeStamp : true
}
);
userModal.statics.isThisEmailinUSe = async function(email){
    if(!email)throw new error('Invalid Email');
    try {
        const user = await this.findOne({email});
        if(user) return false;

        return true;
    } catch (error) {
        console.log('error inside thus method',error.messaage);
        return false;
    }
}

const User = mongoose.model("User" , userModal);
module.exports = User;