const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const session = require('express-session')
const auth=require('./routes/auth');
const assets = require('./routes/assets') ;
const users = require('./routes/users');
const workorder = require('./routes/workorder');
const usergroup = require('./routes/usergroup');
const assetcategory = require('./routes/assetcategory');
const status = require('./routes/status');
const workorderstatus = require('./routes/workorderstatus');
const project = require('./routes/project');
const account = require('./routes/account');
const chargedepartment = require('./routes/chargedepartment');
const asseteventtype = require('./routes/asseteventtype');
const meterreadingunit=require('./routes/meterreadingunit');
const meterreading=require('./routes/meterreading');
const assetuser=require('./routes/assetuser');
const assetevent=require('./routes/assetevent');
const business =require('./routes/business');
const assetbusiness =require('./routes/assetbusiness');
const businessuser =require('./routes/businessuser');
const sheduledmaintenance=require('./routes/scheduledmaintenance');
const scheduletrigger=require('./routes/scheduletrigger');
const workordertask=require('./routes/workordertask');
const scheduledtask=require('./routes/scheduledtask');


const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const { authenticate, authError } = require('./app/middleware');
const Config= require('./config/config');
const { port, secretKey } = Config;

const app = express();

app.set('secretKey', secretKey); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));

app.get('/api', function(req, res){
res.json({"status" : "Server Running ...."});
});

// public route

app.use('/api/auth', auth);
// private route
//app.use('/api', [authenticate, authError]);
app.use('/api/users',[authenticate, authError], users);
app.use('/api/assets', [authenticate, authError], assets);
app.use('/api/workorder', [authenticate, authError],workorder)
app.use('/api/usergroup', usergroup)
app.use('/api/assetcategory', assetcategory);
app.use('/api/status', status);
app.use('/api/workorderstatus',workorderstatus);
app.use('/api/project',project);
app.use('/api/account',[authenticate, authError],account);
app.use('/api/chargedepartment',[authenticate, authError],chargedepartment);
app.use('/api/asseteventtype',[authenticate, authError],asseteventtype);
app.use('/api/meterreadingunit',[authenticate, authError],meterreadingunit);
app.use('/api/meterreading',[authenticate, authError],meterreading);
app.use('/api/assetuser',[authenticate, authError],assetuser);
app.use('/api/assetevent',[authenticate, authError],assetevent);
app.use('/api/business',[authenticate, authError],business);
app.use('/api/assetbusiness',[authenticate, authError],assetbusiness);
app.use('/api/businessuser',[authenticate, authError],businessuser);
app.use('/api/sheduledmaintenance',[authenticate, authError],sheduledmaintenance);
app.use('/api/scheduletrigger',[authenticate, authError],scheduletrigger);
app.use('/api/workordertask',[authenticate, authError],workordertask);
app.use('/api/scheduledtask',[authenticate, authError],scheduledtask);


// app.get('/favicon.ico', function(req, res) {
//     res.sendStatus(204);
// });

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(port, function(){
	console.log('server listening on port ',port);
});
