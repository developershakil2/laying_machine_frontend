const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserController = require("./routes/UserRouter");
const cors = require("cors");
const bodyParser = require("body-parser");
const ProofRoutes = require("./routes/ProofRoutes");
const ProfileRoutes = require("./routes/ProfileRoutes");
const TransactionRoute = require("./routes/TransactionRoute");
const Auth = require("./routes/Auth");
const AdminRouter = require("./routes/AdminRouter");
const getAlluser = require("./routes/GetUserRouter");
const PurchaseRouter = require("./routes/PurchaseRouter");
const catRouter = require("./routes/catRouter");
const Bank = require("./routes/BankRouter");
const BarnRouter = require('./routes/Barn.router');
const errorHandler = require('./Errors');
const app = express();
dotenv.config();
app.use(express.json());


app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use(cors());

mongoose.connect('mongodb+srv://layingmachine:00098700+Aa@cluster0.xwnbua5.mongodb.net/layingmachine').then(()=>{
    console.log("database successfully connected");
}).catch((error)=>{
    console.log("database connected failed", error)
})



    app.use("/", UserController);
    app.use('/', ProofRoutes);
    app.use("/", ProfileRoutes);
    app.use("/", TransactionRoute)
    app.use('/', Auth);
    app.use("/", AdminRouter);
    app.use("/", getAlluser);
    app.use('/', PurchaseRouter);
    app.use("/", catRouter);
    app.use('/', Bank);
    app.use('/', BarnRouter)
    app.use(errorHandler);
app.listen(5000, ()=>{
    console.log(`your server is running at `)
})
