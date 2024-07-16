const vendorsRoutes=require('./routes/vendorsroutes');
const bodyparser=require('body-parser')
const firmroutes=require('./routes/firmroutes')
const productroutes=require('./routes/productroutes')
const path=require('path')


const express = require('express'); // Import the Express module
const app = express(); // Create an instance of an Express application

const port = process.env.port || 4000; // Define the port the server will listen on

// Start the server and listen on the specified port
const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))
app.use(bodyparser.json())
app.use('/firm',firmroutes)
app.use('/product',productroutes)

app.use('/vendors', vendorsRoutes);
app.use('/uploads',express.static('uploads'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Define a route handler for GET requests to the '/home' route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Foodieee');
});

