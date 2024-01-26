const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String },
  price: { type: Number },
  imageurls: [],
  status:{
    type:String , default : 'Confirmed'
   }
  // Other product details as needed
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  userid: { type: String},
  contactno:{
    type:Number,
  },
  
 
  zipcode:{
    type:Number,
  },
  state: { type: String},
  address: { type: String},
  paymentdetail: { type: String},
    city: { type: String },
    locality: { type: String },
    // Other address details as needed
  
  products: [productSchema] // Array of products within an order
});

const orders = mongoose.model('neworders', userSchema);

module.exports = orders;