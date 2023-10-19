const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



// Middlewares
const app = express();
app.use(cors());
app.use(express.json());




// schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    status:String
},{
    timestamps: true
})


// Model

const userModel = mongoose.model("user", schemaData)



//////////////////  API Calling ///////////////


// Read Data
// use => ​http://localhost:3000/

app.get("/", async (req,res) => {
    const data = await userModel.find({})
    res.json({success: true , data: data});
})


// create data in mongo
// use => ​http://localhost:3000/create/

app.post("/create", async(req,res)=>{
     console.log(req.body)
     const data = new userModel(req.body);
     await data.save();
     res.send({success: true, message: "data created", data: data})
})


// Update the data 
// use => ​http://localhost:3000/update/

app.put("/update", async(req,res) => {
    const { _id,...rest} = req.body;
    console.log(rest);
    const data = await userModel.updateOne({_id : _id}, rest);
    res.send({success: true, message: "data updated", data: data})
})

// Delete the data
// use => ​http://localhost:3000/delete/

app.delete('/delete/:id', async(req,res) => {
     const id = req.params.id;
     console.log(id);
     const data = await userModel.deleteOne({_id: id});
     res.send({success: true, message: "data deleted successfully", data: data})
})

// ************************************************************************************************************* //



//connection to database and server
mongoose.connect("mongodb+srv://risabht043:Skt230144@cluster0.7pegfpw.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to db saurabh")
    app.listen(8080, () => {
        console.log("Server is Running")
    })
})
.catch(()=>{
    console.log(err);
})


// Completed crud operation ****************************************************************************************