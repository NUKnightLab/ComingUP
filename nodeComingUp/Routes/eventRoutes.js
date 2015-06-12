var express = require('express'),
    webCalls= require('../models/webCalls');

var routes = function(Event) {

    var eventRouter = express.Router();
    eventRouter.route('/')
        .post(function(req, res){
            var event = new Event(req.body);
            event.save();
            res.status(201).send(event);

        })
        .get(function(req,res){
            var query = req.query;
            webCalls.EventfulData(req.query.latitude, req.query.longitude, req.query.category, req.query.date, function(err, myJson){
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                webCalls.EventbriteData(req.query.latitude,req.query.longitude, req.query.category, req.query.date,  function(err, dude){
                    Event.find(query, function(err, events){
                        if(err) {
                            console.log(err);
                            return res.status(500).send(err);
                        }
                        webCalls.MeetupData(req.query.latitude,req.query.longitude, req.query.category, req.query.date,  function(err, brah){
                            Event.find(query, function(err, events){
                                if(err) {
                                    console.log(err);
                                    return res.status(500).send(err);
                                }
                                for(var i = 0; i < dude.length; i++){
                                    myJson.push(dude[i]);
                                }
                                for(var j = 0; j < brah.length; j++){
                                    myJson.push(brah[j]);
                                }
                                res.json(myJson);
                            });
                        });
                    });
                });
            })
        });
    eventRouter.use('/:eventId', function(req,res,next){
        Event.findById(req.params.eventId, function(err, event){
            if(err) {
                res.status(500).send(err);
            }
            else if (event){
                req.event = event;
                next();
            }
            else
                res.status(404).send('No event found');
        });
    });
    eventRouter.route('/:eventId')
        .get(function(req,res){
            res.json(req.event);
        })
        .put(function(req,res) {
            req.event.title = req.body.eventTitle;
            req.event.description = req.body.description;
            req.event.location = req.body.location;
            req.event.image = req.body.image;
            req.event.url = req.body.url;
            req.event.start = req.body.start;
            req.event.end = req.body.end;
            req.event.social = req.body.social;
            req.event.category = req.body.category;
            req.event.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(req.event);
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            for (var p in req.body) {
                req.event[p] = req.body[p];
            }
            req.event.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.event);
                }
            });
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return eventRouter;
};
module.exports = routes;