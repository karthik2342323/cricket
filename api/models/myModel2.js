const mongoose = require('mongoose');

// creation of schemas
const myModel3 = mongoose.Schema({
    country:{type:String,required:true},
    team:{type:String,required:true},
    player:{type:String,required:true},
    venue:{type:String,required:true},
    match:{type:String,required:true},
    result:{type:String,required:true},
    tournamentScoreTables:{type:String,required:true}
    /*
    userid: {type:String,required:true},
    ts: {type:String,required:true},
    latlong: {type:String,required:true} ,
    noun: {type:String,required:true} ,
    verb:{type:String,required:true} ,
    timeSpendInSecond:{type:String,required:true} ,
    properties:{type:String,required:true},
    budget:{type:String,required:true}

     */
});

// creation of table or documents
const Product = mongoose.model('cricket', myModel3);

// export of data for calling the function or using the DB
module.exports = Product;
