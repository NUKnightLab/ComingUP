/**
 * Created by juliu_000 on 5/12/2015.
 */

(function() {

    var app = angular.module('ComingUp');

    app.factory('eventData', function ($http, $q) {


        var getData = function(location, category, date) {

            var latitude = location.latitude;
            var longitude = location.longitude;
            var url = "http://192.168.1.133:8100/api/events?latitude=" + latitude
                + "&longitude=" + longitude + "&category=" + category + "&date=" + date;
            var promise =  $http.get(url);

            promise.then(function (response) {
                return response.data;
            }).catch(function(err){
                console.log(err);
            });
            return promise;
        };
        return {
            getData: getData
        };

    });

}());