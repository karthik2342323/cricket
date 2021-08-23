const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');





const  cricketSave=require('./api/routes/cricket');


const app = express();

// connection of DB
const connectionURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/IfNav_data_test';
mongoose.Promise = global.Promise;
mongoose.connect(connectionURL,{ 
	useNewUrlParser: true 
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});



app.use('/AddonsOfCountry',cricketSave);


app.use((req,res,next)=>{
	const error = new Error('Error Occurred_1  !!!!!!');
	error.status = 404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status||500);
	res.json({
		error:{
			message:error.message,
			state:error.status||500
		}
	});
});



module.exports = app;