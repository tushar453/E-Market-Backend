
const mongoose = require('mongoose');
require('dotenv').config();

//  mongoose.connect("mongodb://127.0.0.1:27017/Hotel-Room")
//   mongoose.connect("mongodb+srv://sharmatushar3454:Tushar2002@hotel-book.bbxhqnn.mongodb.net/Hotel-Room?retryWrites=true&w=majority")
// mongoose.connect("mongodb://127.0.0.1:27017/MernChat")
mongoose.connect("mongodb+srv://sharmatushar3454:Tushar2002@hotel-book.bbxhqnn.mongodb.net/Ecommerce?retryWrites=true&w=majority")

var connection = mongoose.connection;

connection.on('error' , ()=>{
     console.log('failed')
 })

 connection.on('connected' , ()=>{
     console.log('success')
 })