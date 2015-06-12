var eventModel = require('./eventModel');
var request = require('request');
function EventbriteData(latitude, longitude, cat, date, callback) {
    if(cat == 'entertainment')
        cat = '&categories=103%2C+104%2C+105';

    if(cat == 'sports')
        cat = '&categories=108';

    if(cat == 'food')
        cat = '&categories=110';

    if(cat == 'featured')
        cat = '';

    var url2 = "https://www.eventbriteapi.com/v3/events/search/?start_date.keyword="+date+"&location.within=25mi&location.latitude="+latitude+"&location.longitude="+longitude+cat+"&token=V7HKVKX3H3QQUBAM4V4T";
    console.log(url2);
    request(url2, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(body);
            var entries = [];

            for (var i = 0; i < info.events.length; i++) {
                if(info.events[i].description == null)
                    var description = '';
                else {
                    description = info.events[i].description.html;
                    description = description.substring(0, 400) + "..." + "<br>" + "Learn more at the source!";
                }
                if(info.events[i].venue.address == null)
                    var address = '';
                else
                    address = info.events[i].venue.address.address_1 + " " + info.events[i].venue.address.city + ", " + info.events[i].venue.address.region;
                if(info.events[i].url == null)
                    var link = '';
                else
                    link = info.events[i].url;
                if(info.events[i].start == null)
                    var startTime = '';
                else
                    startTime = info.events[i].start.local;
                if(info.events[i].end == null)
                    var endTime = '';
                else
                    endTime = info.events[i].end.local;
                if(info.events[i].category == null)
                    var category = '';
                else
                    category = info.events[i].category.name;
                if(info.events[i].logo == null){
                    var image = '';
                }
                else{
                    image = info.events[i].logo.url
                }
                var newEntry = {
                    eventTitle: info.events[i].name.text,
                    description: description,
                    location: address,
                    image: image ,
                    url: link,
                    start: startTime,
                    end: endTime,
                    social: '',
                    category: category
                };
                exists = eventModel.findOne({eventTitle: newEntry.eventTitle}, function(err, data) {
                    if(data == null){
                        console.log("inserting");
                        return data;
                    }
                    else{
                        console.log("exists");
                        return data;
                    }
                });
                if(exists == null){
                    newEntry.save();
                }
                entries.push(newEntry);
            }
            callback(null, entries);
        }
        else {
            callback(err);
        }
    });
}

function EventfulData(latitude, longitude, cat, date, callback) {

    if(cat == 'entertainment')
        cat = 'music,comedy,festivals_parades,movies_film,singles_social';

    if(cat == 'sports')
        cat = 'sports';

    if(cat == 'food')
        cat = 'food';

    if(cat == 'featured')
        cat = 'all';

    var url3 = 'http://api.eventful.com/json/events/search?app_key=QSQ45wvm3f3kLDZB&category='+cat+'&date='+date+'&location=' + latitude + "," + longitude + "&within=25mi";
    console.log(url3);
    request(url3, function (err, res, body) {
        console.log(res.statusCode);
        if (!err && res.statusCode == 200) {

            var info = JSON.parse(body);
            var entries = [];

            for (var i = 0; i < info.events.event.length; i++) {
                var event = info.events.event[i];
                if (event.title == null) {
                    var title = ""
                }
                else{
                    title = event.title
                }
                if (event.description == null) {
                    var description = ""
                }
                else{
                    description = event.description;
                    description = description.substring(0, 400) + "..." + "<br>" + "Learn more at the source!";
                }
                if (event.venue_address == null) {
                    var venue_address = ""
                }
                else{
                    venue_address = event.venue_address + " " + event.city_name + ", " + event.region_name;
                }
                if (event.url == null) {
                    var url = ""
                }
                else{
                    url = event.url
                }
                if (event.image == null){
                    var image = ''
                }
                else{
                    image = event.image.medium.url
                }
                if (event.start_time == null) {
                    var start_time = ""
                }
                else{
                    start_time = event.start_time
                }
                if (event.end_time == null) {
                    var end_time = ""
                }
                else{
                    end_time = event.end_time
                }
                if (event.category == null) {
                    var category = ""
                }
                else{
                    category = event.category
                }
                var newEntry = {
                    eventTitle: title,
                    description: description,
                    location: venue_address,
                    image: image,
                    url: url,
                    start: start_time.local,
                    end: end_time.local,
                    social: "",
                    category: category
                };
                exists = eventModel.findOne({eventTitle: newEntry.eventTitle}, function(err, data) {
                    if(data == null){
                        console.log("inserting");
                        return data;
                    }
                    else{
                        console.log("exists");
                        return data;
                    }
                });
                if(exists == null){
                    newEntry.save();
                }
                entries.push(newEntry);
            }
            callback(null, entries);
        }
        else{
            callback(err);
        }
    });
}

function MeetupData(latitude, longitude, cat, date, callback) {

    if(cat == 'entertainment')
        cat = '&category=5,20,21,31';

    if(cat == 'sports')
        cat = '&category=32';

    if(cat == 'food')
        cat = '&category=10';

    if(cat == 'featured')
        cat = '';

    if(date == 'today'){
        date = '&date=0d,1d';
    }
    if(date == 'tomorrow'){
        date = '&date=1d,2d';
    }
    if(date == 'this week'){
        date = '&date=0d,6d';
    }
    if(date == 'next week'){
        date = '&date=6d,12d';
    }
    var url4 = "https://api.meetup.com/2/open_events.json?lat="+latitude+"&lon="+longitude+cat+date+"&text_format=plain&desc=true&fields=group_photo&key=3846057136627175766578667d3d70";
    console.log(url4);
    request(url4, function (err, res, body) {
        console.log(res.statusCode);
        if (!err && res.statusCode == 200) {

            var info = JSON.parse(body);
            var entries = [];

            for (var i = 0; i < info.results.length; i++) {
                var event = info.results[i];
                if (event.name == null){
                    var title = ""
                }
                else{
                    title = event.name
                }
                if (event.description == null) {
                   var description = ""
                }
                else{
                    description = event.description;
                    description = description.substring(0, 400) + "..." + "<br>" + "Learn more at the source!";
                }
                if (event.venue == null) {
                    var venue = ""
                }
                else{
                    venue = event.venue.address_1 + " " + event.venue.city + ", " + event.venue.state;
                }
                if (event.event_url== null) {
                    var event_url= ""
                }
                else{
                    event_url = event.event_url
                }
                if (event.time == null) {
                    var time = ""
                }
                else{
                    time = '';
                    //time = date.toString(event.time)
                }
                if (event.group == null) {
                    var group = "";
                    var image = ""
                }
                else{
                    group = event.group;
                    if(group.group_photo == null) {
                        image = ""
                    }else {
                        image = event.group.group_photo.photo_link
                    }
                }
                var newEntry = {
                    eventTitle: title,
                    description: description,
                    location: venue,
                    image: image,
                    url: event_url,
                    start: time,
                    end: time+event.duration,
                    social: "",
                    category: ''
                };
                exists = eventModel.findOne({eventTitle: newEntry.eventTitle}, function(err, data) {
                    if(data == null){
                        console.log("inserting");
                        return data;
                    }
                    else{
                        console.log("exists");
                        return data;
                    }
                });
                if(exists == null){
                    newEntry.save();
                }
                entries.push(newEntry);
            }
            callback(null, entries);
        }
        else{
            callback(err);
        }
    });
}

exports.getNote = function(req, res){
    res.render('newnote', {title: 'eventModel - new note'})
};
exports.EventfulData = EventfulData;
exports.EventbriteData = EventbriteData;
exports.MeetupData = MeetupData;
