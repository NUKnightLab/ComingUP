/**
 * Created by juliu_000 on 5/12/2015.
 */

var app = angular.module('ComingUp');

app.controller('MainController',
    function MainController($scope, $ionicModal, $localStorage){

        $ionicModal.fromTemplateUrl('../app/LikedEvents.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.savedEvents = [];
        $scope.setEvents = function(key, value){
            console.log("I was clicked.");
            $localStorage.setObject(key, value);
            if($scope.savedEvents == undefined){
                $scope.savedEvents = [value];
            }
            else {
                $scope.savedEvents.push(value);
            }
        };

        $scope.getSavedEvents = function(key){
            $localStorage.getObject(key);
        };


        $scope.savedEvents = $scope.getSavedEvents('event');
        console.log($scope.savedEvents);
        //$scope.savedEvent = {
        //    event1:{
        //        eventTitle: "blah",
        //        description: description,
        //        location: venue,
        //        image: image,
        //        url: event_url,
        //        start: time,
        //        end: time+event.duration,
        //        social: "",
        //        category: ''
        //    },
        //    event2:{
        //        eventTitle: "abgas" ,
        //        description: description,
        //        location: venue,
        //        image: image,
        //        url: event_url,
        //        start: time,
        //        end: time+event.duration,
        //        social: "",
        //        category: ''
        //    },
        //    event3:{
        //        eventTitle: "fabsuf",
        //        description: description,
        //        location: venue,
        //        image: image,
        //        url: event_url,
        //        start: time,
        //        end: time+event.duration,
        //        social: "",
        //        category: ''
        //    }
        //}

    });
