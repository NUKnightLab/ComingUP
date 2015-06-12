/**
 * Created by juliu_000 on 5/20/2015.
 */
var mongoose = require('mongoose');
var request = require('request');
var Schema = mongoose.Schema;

var eventModel = new Schema({
    eventTitle: String,
    description: String,
    location: String,
    image: String,
    url: String,
    start: String,
    end: String,
    social: String,
    category: String
});



module.exports = mongoose.model('Event', eventModel);