const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require('mongoose');


//assets
app.use(express.static("public"));

//database-mongoDB
mongoose.connect(
  "mongodb+srv://admin-ansh:anshsarin00@cluster0.2l6ki.mongodb.net/pizza",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connected");
}).catch(err => {
    console.log("Connection failed");
})


//set views
app.use(expressLayout);
app.set("views", path.join(__dirname + "/resources/views"));
app.set("view engine", "ejs");

//routes
require('./routes/web')(app);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})