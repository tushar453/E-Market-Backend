const express = require("express");
const app = express();
const mongodb = require('mongodb');
const cors = require("cors");

require("./db");
require('dotenv').config();


app.use(express.json());
app.use(cors());

const port = process.env.port|| 4000;

app.listen(port, () => console.log(`Listening on ${port}`));

const User = require("./modals/userModal");
const Phones = require("./modals/Phonesmodal");
const Ears = require("./modals/Earphonemodal");
const Watch = require("./modals/Smartwmodal");
const Laptop = require("./modals/Laptopmodal");
const Phonesmodal = require("./modals/Phonesmodal");
const Cart = require("./modals/Cartmodal");
const Wish = require("./modals/Wishlist");
const Sells = require("./modals/Buymodal");
const Address = require("./modals/Address");

// const Sells = require("./modals/Buymodal");
const nodemailer = require("nodemailer");
app.set('view engine', 'ejs');
//for send mail

const sendverifymail = async(name , email ,user_id)=>{
   try {
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth:{
        user:'sharmahimesh282@gmail.com',
        // pass:'zdth ijey bdxd ruvn'
        pass:'hbna ozym hfgt brrw' 
      }
    });
    const mailoption = {
      from:'tksharma230@gmail.com',
      to:email,
      subject:'For Verification mail',
      html:'<p>hii '+name+' pleasae click here to <a href="http://localhost:4000/verify?id='+user_id+'">Verify</a>your mail </p> '
    }

    transporter.sendMail(mailoption,function(error,info){
      if(error){
        console.log(error);
      }
      else{
        console.log("email has been sent:-",info.response);
      }
    })
   } catch (error) {
    console.log(error.message);
   }
}

const verifymail = async(req,res)=>{
  try {
   const updateinfo = await User.updateOne({_id:req.query.id},{$set:{isVerified:true}});

   console.log(updateinfo);
   res.render("email-verfied");
  } catch (error) {
    console.log(error.message);
  }
};

app.get('/verify',verifymail);

app.post("/register", async (req, resp) => {
   
  const isNewuser = await User.isThisEmailinUSe(req.body.email);
  if(!isNewuser)
  // resp.send("This Email is Already in use,try sign-in");
  return resp.json({
success:false,
message:'This Email is Already in use,try sign-in',
});
   


    let newuser = User(req.body);
    let result = await newuser.save();
    // resp.send(req.body);
    // resp.send(req.body);
    if(result){ 
     sendverifymail(req.body.name,req.body.email,result._id);
     resp.send({message:'A Verification  Link Has Been Sent to Your Mail '});
    //  return resp.json({
    //   success:false,
    //   message:'A verification Link Has Been Sent To Your Mail',
    //   });
         
    }
    
   
  });

  app.post("/login", async (req, resp) => {
    // let newuser  = User(req.body);
    // let result =await newuser.save();
  
    // resp.send(result);
  
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isVerified:user.isVerified,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      resp.send(temp);
    } else {
      return resp.status(400).json({ message: "login failed" });
    }
  });
   
  app.post("/createPhones", async (req, resp) => {
    let data = Phones(req.body);
    let result = await data.save();
    
    resp.send(result);
  });

  app.post("/createEars", async (req, resp) => {
    let data = Ears(req.body);
    let result = await data.save();
    
    resp.send(result);
  });

  app.get("/Earlist", async (req, resp) => {
    let data = await Ears.find();
    resp.send(data);
  });

  app.get("/list", async (req, resp) => {
    let data = await Phones.find();
    resp.send(data);
  });

  
  app.post("/createWatch", async (req, resp) => {
    let data = Watch(req.body);
    let result = await data.save();
    
    resp.send(result);
  });

  app.get("/watchlist", async (req, resp) => {
    let data = await Watch.find();
    resp.send(data);
  });

  app.post("/createLaptop", async (req, resp) => {
    let data = Laptop(req.body);
    let result = await data.save();
    
    resp.send(result);
  });

  app.get("/Laptoplist", async (req, resp) => {
    let data = await Laptop.find();
    resp.send(data);
  });

  app.post("/getProductbyid", async (req, resp) => {
    const roomid = req.body.earsid;
  
   let data1 = await Laptop.findOne({ _id: roomid });
    if(data1){
     resp.send(data1); 
    }

    let data2 = await Watch.findOne({ _id: roomid });
    if(data2){
     resp.send(data2); 
    }

   let data3 = await Ears.findOne({ _id: roomid });
    if(data3){
     resp.send(data3); 
    }

    let data4 = await Phones.findOne({ _id: roomid });
    if(data4){
     resp.send(data4); 
    }
    return null;
    
    
  });
  

  app.post("/BuyProductbyid", async (req, resp) => {
    const roomid = req.body.producid;
  
   let data1 = await Laptop.findOne({ _id: roomid });
    if(data1){
     resp.send(data1); 
    }

    let data2 = await Watch.findOne({ _id: roomid });
    if(data2){
     resp.send(data2); 
    }

   let data3 = await Ears.findOne({ _id: roomid });
    if(data3){
     resp.send(data3); 
    }

    let data4 = await Phones.findOne({ _id: roomid });
    if(data4){
     resp.send(data4); 
    }
    return null;
    
    
  });
  
  


  
  app.post("/addtocart", async (req, res) => {
    const {
      product,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: product.name,
        price:product.price,
        productid: product._id,
        userid,
        username,
        stars:product.stars,
        description:product.description,
        imageurls:product.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );




  app.post("/addtocartfromwish", async (req, res) => {
    const {
      wish,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: wish.name,
        price:wish.price,
        productid: wish._id,
        userid,
        username,
        stars:wish.stars,
        description:wish.description,
        imageurls:wish.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );
  app.post("/addtocartfromlaptop", async (req, res) => {
    const {
      laptop,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: laptop.name,
        price:laptop.price,
        productid: laptop._id,
        userid,
        username,
        stars:laptop.stars,
        description:laptop.description,
        imageurls:laptop.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );


  app.post("/addtocartfromheadphone", async (req, res) => {
    const {
      ears,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: ears.name,
        price:ears.price,
        productid: ears._id,
        userid,
        username,
        stars:ears.stars,
        description:ears.description,
        imageurls:ears.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );


  app.post("/addtocartfromwatch", async (req, res) => {
    const {
      watch,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: watch.name,
        price:watch.price,
        productid: watch._id,
        userid,
        username,
        stars:watch.stars,
        description:watch.description,
        imageurls:watch.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );


  app.post("/addtocartfromphone", async (req, res) => {
    const {
      phone,
      userid,
      username,
    } = req.body;
  
       const newcart = new Cart({
        name: phone.name,
        price:phone.price,
        productid: phone._id,
        userid,
        username,
        stars:phone.stars,
        description:phone.description,
        imageurls:phone.imageurls
      });
         
      const addingcart = await newcart.save();
      res.send("Added to Cart Succesfully");
      
     
    }
  
  );

  app.post("/buyproduct", async (req, res) => {
    const {
      bproduct,
      name,
      contactno,
      address,
      city,
      state,
      userid,
      zipcode,
      paymentdetail
    } = req.body;
  
       const newsell = new Sells({
        buyer: name,
        contactno:contactno,
        address: address,
        city:city,
        state:state,
        zipcode:zipcode,
        userid:userid,
        productname:bproduct.name,
        price:bproduct.price,
        description:bproduct.description,
        payment:paymentdetail
      });
         
      const addtoSell = await newsell.save();
      res.send("Order Placed Successfully");
      
     
    }
  
  );



   
  app.post("/addtoWish", async (req, res) => {
    const {
      product,
      userid,
      username,
    } = req.body;
  
       const newwish = new Wish({
        name: product.name,
        productid: product._id,
        userid,
        username,
        price:product.price,
        stars:product.stars,
        description:product.description,
        imageurls:product.imageurls
      });
         
      const addingcart = await newwish.save();
      res.send("Added to Wishlist Succesfully");
      
     
    }
  
  );

  app.post("/getCart", async (req, resp) => {
    const userid = req.body.userid;
    
    const cartdata = await Cart.find({ userid : userid});
    resp.send(cartdata);
  });
  

  app.post("/getWish", async (req, resp) => {
    const userid = req.body.userid;
    
    const wishdata = await Wish.find({ userid : userid});
    resp.send(wishdata);
  });
  


  app.delete("/:id" ,async(req,resp)=>{
    const producid = req.params.id;
    const data = await Cart.deleteOne({_id:new mongodb.ObjectId(producid)});

    
    resp.send(data);
   
  
  });

  app.delete("/daddress/:aid" ,async(req,resp)=>{
    const addressid = req.params.aid;
    const data = await Address.deleteOne({_id:new mongodb.ObjectId(addressid)});

    
    resp.send(data);
   
  
  });

  
  app.delete("/delete/:wid" ,async(req,resp)=>{
    const wishid = req.params.wid;
    const data = await Wish.deleteOne({_id:new mongodb.ObjectId(wishid)});
    resp.send(data);
  });


  app.post("/address", async (req, resp) => {

    const {
      
      name,
      contactno,
      address,
      city,
      state,
      userid,
      zipcode,
      
    } = req.body;
  
       const newaddress = new Address({
        buyer: name,
        contactno:contactno,
        address: address,
        city:city,
        state:state,
        zipcode:zipcode,
        userid:userid,
       
      
      
      });
         
      const addtoAddress = await newaddress.save();
      resp.send("New Address Added Successfully");











    
  });


  app.post("/getAddress", async (req, resp) => {
    const userid = req.body.userid;
    
    const addressdata = await Address.find({ userid : userid});
    resp.send(addressdata);
  });

  app.post("/getOrders", async (req, resp) => {
    const userid = req.body.userid;
    
    const orderdata = await Sells.find({ userid : userid});
    resp.send(orderdata);
  });
  



  app.post("/cancelorder" ,async(req ,resp)=>{
    const{orderid} = req.body;
  
  const orders = await Sells.findOne({_id:orderid})
    
   orders.status = 'cancelled';
  //  console.log(bookingss);
  let result  = await orders.save();
  

  resp.send("Order cancelled");
  });