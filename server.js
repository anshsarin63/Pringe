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
const passport = require('passport');
const Emitter=require('events')

//assets
app.use(express.static("public"));
app.use(express.json());




//database-mongoDB
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
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

//event config
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

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


//passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


//set views
app.use(expressLayout);
app.set("views", path.join(__dirname + "/resources/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//global middleware
app.use((req, res, next) => {
  // console.log(req.session.cartItem);
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
})

//routes
require("./routes/web")(app);

const PORT = process.env.PORT || 3000;
const server=app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

//socket connection
const io = require('socket.io')(server);
// console.log(io);
io.on('connection', (socket) => {
  // console.log(socket.id);
  socket.on('join', (orderId) => {
    socket.join(orderId);
  })
})

eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
})

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced",data);
});
