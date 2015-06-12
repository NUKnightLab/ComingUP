/**
 * Created by juliu_000 on 6/2/2015.
 */
var app = angular.module('ComingUp');

app.controller('EntertainmentController',
    function EntertainmentController($scope, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate,$localStorage, eventData, LocationService){
        $ionicLoading.show({
            content:'Loading',
            animation:'fade-in',
            ShowBackDrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.selectedDate = "today";
        //$scope.setEvents = $localStorage.setObject(key, value);
        $scope.location = 'Getting location...';
        $scope.events = "No events loaded";
        $scope.city = "Getting location...";
        $scope.desc = false;
        $scope.likedEvents = "";
        LocationService.getLocation().
            then(function (location) {
                if (location) {
                    $scope.location = location;
                }
                else {
                    $scope.location = "Couldn't get location";
                }
            },
            function(error) {
                alert('error', error);
            });
        if($scope.location === 'Getting location...') {
            $scope.$watch('location', function (newLocation, oldLocation) {
                if (typeof newLocation === "object") {
                    console.log(newLocation);
                    eventData.getData(newLocation, "entertainment", $scope.selectedDate).
                        then(function (data) {
                            if (data) {
                                console.log('setting event');
                                if (data.data.image !== "") {
                                    $scope.events = data.data;
                                    console.log($scope.events);
                                }
                                LocationService.getCity(newLocation).
                                    then(function (info) {
                                        if (info) {
                                            console.log(info);
                                            $scope.city = info.data.results[0].components.city;
                                        }
                                        else {
                                            console.log("Shit is fucky")
                                        }
                                    })
                            }
                            else {
                                console.log("Couldn't log events");
                            }
                        })
                }
            });
        }
        console.log($scope.events);
        $scope.$watch('events', function(newEvents, oldEvents)
        {
            if(typeof newEvents !== 'string'){
                $ionicLoading.hide();
            }
        });
        $scope.updateEvents = function(){
            $ionicLoading.show();
            eventData.getData($scope.location, "", $scope.selectedDate).
                then(function (data) {
                    if (data) {
                        console.log('setting event');
                        if (data.data.image !== "") {
                            $scope.events = data.data;
                            $ionicLoading.hide();
                        }
                    }
                    else {
                        console.log("Something went wrong changing the date.")
                    }
                })
        };
    });