const express = require("express");
const routeSkill = require('./routes/skill'); // import the routes
const routeProject = require('./routes/project'); // import the routes
const compression = require('compression');
const app = express();
app.use(compression());
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

app.use(express.json());
app.use(helmet());

app.use('/', routeSkill);
app.use('/', routeProject);
app.use('/uploads', express.static('./uploads'));

// add midddleware here

app.get("/", function (req, res) {
    res.send(req.headers, req.originalUrl, req.method, req.body);
  });

  
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
  })

  //establish connection to database (cloud)
  //  mongoose.connect(
  //      process.env.MONGODB_URI,
  //      { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
  //      (err) => {
  //          if (err) return console.log("Error: ", err);
  //          console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
  //      }
  //  );

//Set up default mongoose connection (local)
var mongoDB = 'mongodb://localhost:27017/portfolio';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));





