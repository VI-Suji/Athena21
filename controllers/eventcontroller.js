const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');





module.exports.registerevent = (req,res) =>{
  
    const {numevents, event1, event2, event3,needpcbkit, isISTE, ISTEregno,couponcode1,couponcode2} = req.body;
    req.session.regdetails = req.body;
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    console.log(req.body);


    db.query("INSERT INTO registration SET ?", {name : req.session.name, email : req.session.email, eventName1: event1, eventName2: event2, eventName3: event3, needpcbkit: needpcbkit, isISTE: isISTE, ISTEregno: ISTEregno, couponcode1: couponcode1, couponcode2: couponcode2 },(error,reusult)=>{
        if(error){
            console.log(error)
        }
        else {
            res.redirect('/userdashboard/eventcheckout');
        }

    });

}

module.exports.getevents = (req,res) =>{
    db.query('SELECT * FROM events', (err,results) =>{
        if(err)
            console.log(err);
        
        else{
            
            eventc1 = [];
            eventc2 = [];
            eventc3 = [];
            eventc4 = [];
            eventc5 = [];
            eventc6 = [];
            for(i=0;i<3;i++){
                eventc1.push(results[i]);
            }
            for(i=3;i<4;i++){
                eventc2.push(results[i]);
            }
           /* for(i=6;i<9;i++){
                eventc3.push(results[i]);
            }
            for(i=10;i<12;i++){
                eventc4.push(results[i]);
            }
            for(i=12;i<15;i++){
                eventc5.push(results[i]);
            }
            for(i=15;i<16;i++){
                eventc6.push(results[i]);
            } */
            res.render('events', {eventc1:eventc1,eventc2:eventc2,eventc3:eventc3,eventc4:eventc4,eventc5:eventc5,eventc6:eventc6});
        }
    })
}


 // EACH EVENT PAGE RENDERING
module.exports.eachevent = (req,res) =>{
    console.log(req.params.id)
    db.query('SELECT * FROM events WHERE id = ?',[req.params.id], (err,results) =>{
        if(err)
            console.log(err);
        
        else{
            console.log(results);
            res.render('eachevent', {events:results});
        }
    })
}
