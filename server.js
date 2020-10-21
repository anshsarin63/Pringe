require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDBStore = require("connect-mongo")(session);

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
connection
  .once("open", () => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Connection failed");
  });


//session-connect
let mongoStore=new MongoDBStore({
  mongooseConnection: connection,
  collection:'session'
})

//sessions config
app.use(flash());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

//set views
app.use(expressLayout);
app.set("views", path.join(__dirname + "/resources/views"));
app.set("view engine", "ejs");

//routes
require("./routes/web")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
