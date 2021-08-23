/*
 country:{type:String,required:true},
    team:{type:String,required:true},
    player:{type:String,required:true},
    venue:{type:String,required:true},
    match:{type:String,required:true},
    result:{type:String,required:true},
    tournamentScoreTables:{type:String,required:true}
 */
const myModelCricket=require("../models/myModel2");
const mongoose = require('mongoose');


/*
   Add contry to so information will get store string but we can parse to json via JSON.parse(object_typeString)
   and to store then we need to convert to string by JSON.stringify(object_typeString).


   While fetching time its consider that d
 */



exports.addCountry =async (req,res,next)=>{
    // lets feth the data
    var country=req.body.country;
    let condition1=false;
    if(country)
    {
        // lets check whether its exist or not
        await myModelCricket.find({country:country})
            .exec().then(data=>{
            if(data)
            {
                condition1=true;
                return res.status(401).json({
                    MSG:' Data already exist so no need to add  '
                });
            }
        }).catch(error=>{
                return res.status(400).json({
                    MSG:'Error  '+error
                });
            });
    }
    else {
        return res.status(400).json({
            MSG: ' Country not found in parse body '
        });
    }

    // for debugging
    if(condition1)
    {
        // To terminate the flow we need this thing U can return any number
        return 0;
    }
    // for debugging

    /*
 country:{type:String,required:true},
    team:{type:String,required:true},
    player:{type:String,required:true},
    venue:{type:String,required:true},
    match:{type:String,required:true},
    result:{type:String,required:true},
    tournamentScoreTables:{type:String,required:true}
 */

    var team=req.body.team;
    var  player =req.body.player;
    var venue=req.body.venue;
    var match1=req.body.match1;
    var result=req.body.result;
    var tournamentScoreTables=req.body.tst;

    const data=new myModelCricket({country:country,
        team: team,
        player: player,
        venue:venue,
        match:match1,
        result:result,
        tournamentScoreTables:tournamentScoreTables
    });

    await data.save().exec().then(data=>{
        if(data)
        {
            return res.status(201).json({
                MSG:'Data added successfully '
            });
        }
        else
        {
            return res.status(400).json({
                MSG:' Unable to save error'
            });
        }
    }).catch(error=>{
        return res.status(400).json({
            MSG:' Error '+error
        });
    })

};

/*
     Remove country from list means erasing of data
 */

exports.removeDatas =async (req,res,next)=>{
    var country=req.body.country;
    if(country)
    {
        var condition1=false;
        // first fin whether its exist or not if its exist then remove
        await myModelCricket.find({country:country}).exec().then(data=>{
            if(data)
            {
                condition1=true;
            }
            else
            {
                return res.status(400).json({
                    MSG:' unable to find country in database'
                });
            }
        }).catch(error=>{
           if(error)
           {
               return res.status(400).json({
                   MSG:' Error : '+error
               });
           }
        });
        if(condition1)
        {
            await myModelCricket.remove({country:country}).exec().then(data=>{
                return res.status(200).json({
                    MSG:' Successfully deleted'
                }).catch(error=>{
                    if(error)
                    {
                        return res.status(400).json({
                            MSG:' Error '+error
                        });
                    }
                });
            })
        }
    }
}

/*
  Whichever para U need to update just put rest of then gonna remain same in database
 */
exports.updateDatas =async (req,res,next)=>{
    var team=req.body.team;
    var country=req.body.country;
    var  player =req.body.player;
    var venue=req.body.venue;
    var match1=req.body.match1;
    var result=req.body.results;
    var tournamentScoreTables=req.body.tst;



    var databaseCountry;
    var databaseData;


    if(!country || country===false)
    {
        return res.status(400).json({
            MSG:' country not found in body parse'
        });
    }
    else
    {
        await myModelCricket.find(country).exec().then(data=>{
            if(!data || data===false || data.length<0)
            {
                return res.status(400).json({
                    MSG:' country not found in database'
                });
            }
            else
            {
                databaseCountry=true;
                databaseData=data;
            }
        });
    }

    if(databaseCountry)
    {
        // alter of datas get the data which user wanna to update or if they dont wanna update any para import from database
        // and update it
        team=req.body.team || databaseData.team;
        player=req.body.player || databaseData.player;
        venue=req.body.venue || databaseData.venue;
        match1=req.body.match1 || databaseData.match;
        result=req.body.results || databaseData.result;
        tournamentScoreTables=req.body.tst || databaseData.tournamentScoreTables;

        // model to refer
        const updateData=new myModelCricket({
            country:country,
            team:team,
            player:player,
            venue:venue,
            match:match1,
            result:result,
            tournamentScoreTables:tournamentScoreTables
        });
        await  myModelCricket.updateOne({country:country},{$set: {country:country,
                    team:team,
                    player:player,
                    venue:venue,
                    match:match1,
                    result:result,
                    tournamentScoreTables:tournamentScoreTables}}
        ,{returnOriginal : false}).exec().then(data=>{

            if(data)
            {
                return res.status(201).json({
                    MSG:'Data updated  successfully '
                });
            }
            else
            {
                return res.status(400).json({
                    MSG:'Data fail to update '
                });
            }

        }).catch(error=>{
            return res.status(400).json({
                MSG:' Error occur  '+error
            });
        });
    }

};


exports.getData =async (req,res,next)=>{
    var country=req.body.country;
    if(country)
    {
        await myModelCricket.find({country:country}).exec().then(data=>{
            if(data)
            {
                return res.status(201).json({
                    MSG:'Data :  '+data+" \n\n "+" This data in json need to parse in JSON.parse() for its usage"
                });
            }
            else
            {
                return res.status(400).json({
                    MSG:'Country not found in database'
                });
            }
        }).catch(error=>{
            if(error)
            {
                return res.status(500).json({
                    MSG:'Error occured while searching data'
                });
            }
        })
    }
    else
    {
        return res.status(400).json({
            MSG:' country para is not found in body parser'
        });
    }
};

exports.getListofCountry =async (req,res,next)=>{
    var condition=false;
    await myModelCricket.find({}).exec()
        .then(data=>{
            if(data===true || data.length>0 || data)
            {
                condition=true;
                return res.status(200).json({
                    data:" "+data
                });

            }
        }).catch(error=>{
            if(error)
            {
                return res.status(400).json({
                    error:" "+error
                });
            }
        });

}



/*
exports.findCountry =async (req,res,next)=>{
    // lets feth the data
    var country=req.body.country;
    if(country)
    {
        myModelCricket.find({country:country})
            .exec().then(data=>{
            if()
            {

            }
        })
    }

};

 */
