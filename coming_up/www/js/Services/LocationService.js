app.factory('LocationService', function($http, $q) {
    var getCity = function(location) {
        var deferred;
        var key = "7a2b24aac0a34e4e611e3520fbfe2af7";
        if (location === null) {
            console.log("Location not set")
        }
        else {
            deferred =  $http.get("https://api.opencagedata.com/geocode/v1/json?q="+location.latitude+"," +
                location.longitude + "&pretty=1&key="+key);
            deferred.then(function(response){
                return response.data;
            }).catch(function(err){
                console.log(err);
            });
            return deferred;
        }
    };
    var location = null;

    var getLocation = function(refresh) {

        var deferred = $q.defer();

        if( location === null || refresh ) {

            console.log('Getting latitude and longitude');
            navigator.geolocation.getCurrentPosition(function(pos) {
                location =  {
                    latitude : pos.coords.latitude,
                    longitude : pos.coords.longitude
                };
                deferred.resolve(location);

            }, function(error) {
                console.log('Got error!');
                console.log(error);
                location = null;

                deferred.reject('Failed to Get Latitude and Longitude')
            });

        }  else {
            deferred.resolve(location);
        }
        return deferred.promise;
    };
    return {
        getLocation : getLocation,
        getCity: getCity
    }
});
