/**
 * @author j.l.pujante
 * created on 30.01.2017
 */
var NIGHT_MODE_HOUR = 19;
var MAP_ZOOM = 12;
var MAP_TRAFFIC_INFO = false;
var MAP_STYLE_DEFAULT_MODE = 'none';
var UPDATE_MAP_INTERVAL = 2 * 1000;

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.tracker')
        .controller('GmapTrackerPageCtrl', GmapTrackerPageCtrl);

    /** @ngInject */
    function GmapTrackerPageCtrl($scope, $rootScope, $timeout, $location, $http, $interval, trackerApi) {
        $scope.initialize = function () {
            // var mapCanvas = document.getElementById('google-maps');
            // var mapOptions = {
            //   center: new google.maps.LatLng(49.5969953, 6.1374627),
            //   zoom: MAP_ZOOM,
            //   mapTypeId: google.maps.MapTypeId.ROADMAP
            // };
            // $scope.map = new google.maps.Map(mapCanvas, mapOptions);

            // spinnerService.show();
            $scope.url_img_marker_start = get_asset('/img/marker-start.png');
            $scope.url_img_marker_end = get_asset('/img/marker-end.png');
            $scope.url_img_marker_item = get_asset('/img/marker.png');

            $scope.mapRefreshInterval = 0;
            $scope.traffic_layer_actived = MAP_TRAFFIC_INFO;
            $scope.theme_actived = MAP_STYLE_DEFAULT_MODE;
            $scope.trucksPositionList = [];
            $scope.trucksRoutesList = [];
            $scope.trucksCheckpointList = [];
            $scope.trucksPositionMarker = [];
            $scope.truckPlanCoordinates = [];
            $rootScope.map_styles_available = [];
            $scope.loadMap = false;
            //
            $scope.getMapStyling();

            // spinnerService.show();
            // $timeout(function() {
            //     $scope.initMap();
            //     $timeout(function() {
            //         spinnerService.hide();
            //     }, 1000);
            // }, 1000);
        };

        $scope.$on('traffic.on', function (event) {
            console.log("traffic.on captured!");
            $scope.traffic_layer_actived = true;
            $scope.initMap();
        });
        $scope.$on('traffic.off', function (event) {
            console.log("traffic.off captured!");
            $scope.traffic_layer_actived = false;
            $scope.initMap();
        });
        $scope.$on('map.styling', function (event, style) {
            console.log("map.styling captured!");
            if (style in $scope.styles) {
                $scope.map.setOptions({styles: $scope.styles[style]});
            }
        });
        $scope.$on('theme.night.off', function (event) {
            console.log("theme.night.off captured!");
            $scope.setMapStyle('day');
        });
        $scope.$on('theme.night.on', function (event) {
            console.log("theme.night.on captured!");
            $scope.setMapStyle('night');
        });
        // $scope.$on('theme.auto.off', function (event) {
        //     console.log("theme.auto.off captured!");
        //     $scope.setMapStyle('day');
        // });
        $scope.$on('theme.auto.on', function (event) {
            console.log("theme.auto.on captured!");
            $scope.setMapStyle(MAP_STYLE_DEFAULT_MODE);
        });

        $scope.$on('map.element.added', function (event, item) {
            console.log("map.element.added!");
            if (!$scope.trucksPositionList) {
                return;
            }
            //Backup
            if ($scope.trucksPositionList.length > 0) {
                console.log("Backing positions");
                $scope._trucksPositionList = $scope.trucksPositionList;
                $scope.trucksPositionList = [];
            }
            trackerApi.getTruckRoute(item.id).then(function (resp) {
                $scope.trucksCheckpointList.push(resp.data);
            });
        });
        $scope.$on('map.element.removed', function (event, item) {
            console.log("map.element.removed!");
            // if (!$scope.trucksCheckpointList) {
            //     return;
            // }
            var values = $scope.trucksCheckpointList.slice();
            for (var i = 0; i < values.length; i++) {
                var checkpoint = values[i];
                if (checkpoint && checkpoint.length > 0) {
                    console.log(checkpoint);
                    if (parseInt(checkpoint[0]['id']) == parseInt(item['id'])) {
                        console.log("Deleted item.id=" + item['id']);
                        $scope.trucksCheckpointList.splice(i, 1);
                        break;
                    }
                }
            }
            //Restore
            console.log("$scope.trucksCheckpointList.length=" + $scope.trucksCheckpointList.length);
            console.log($scope.trucksCheckpointList);
            if ($scope.trucksCheckpointList.length == 0) {
                console.log("Restoring positions");
                $scope.trucksPositionList = $scope._trucksPositionList;
            }
        });

        $scope.setMapStyle = function (map_type) {
            var style = 'retro';
            if (map_type == MAP_STYLE_DEFAULT_MODE) {
                $scope.theme_actived = 'default';
                var currentdate = new Date();
                var h = currentdate.getHours();
                if (h >= NIGHT_MODE_HOUR) {
                    style = 'aubergine';
                    $scope.theme_actived = style;
                    $scope.$emit('style.night.on');
                }
            } else if (map_type == 'day') {
                $scope.theme_actived = map_type;
                style = 'default';
            } else if (map_type == 'night') {
                $scope.theme_actived = map_type;
                style = 'aubergine';
            }
            $scope.map.setOptions({styles: $scope.styles[style]});
        };
        $scope.getGeoLocation = function () {
//                return {lat: 49.5969953, lng: 6.1374627};
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

//                        infoWindow.setPosition(pos);
//                        infoWindow.setContent('Location found.');
                    map.setCenter(pos);

                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        };

        $scope.handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
            console.log('Error: The Geolocation service failed.');
            console.log('Your browser doesn\'t support geolocation.');
//                infoWindow.setPosition(pos);
//                infoWindow.setContent(browserHasGeolocation ?
//                    'Error: The Geolocation service failed.' :
//                    'Error: Your browser doesn\'t support geolocation.');
        };

        $scope.$watch('loadMap', function () {
            console.log("watch loadMap=" + $scope.loadMap);
            if ($scope.loadMap) {
                console.log("watch loadMap --> loading map....");
                $timeout(function () {
                    $scope.initMap();
                    $timeout(function () {
                        // spinnerService.hide();
                    }, 1000);
                }, 1000);
            }
        });

        $scope.$watch('trucksCheckpointList.length', function () {
            console.log("trucksCheckpointList watch...");
            if (angular.isUndefined($scope.trucksRoutesList)) {
                return;
            }
            var each;
            //Clear old routes
            for (each = 0; each < $scope.trucksRoutesList.length; each++) {
                //remove route
                $scope.trucksRoutesList[each][0].setMap(null);
                //remove initial marker
                if ($scope.trucksRoutesList[each][1]) {
                    $scope.trucksRoutesList[each][1].setMap(null);
                }
                //remove end marker
                if ($scope.trucksRoutesList[each][2]) {
                    $scope.trucksRoutesList[each][2].setMap(null);
                }
            }

            if ($scope.trucksCheckpointList && $scope.trucksCheckpointList.length > 0) {
                for (each = 0; each < $scope.trucksCheckpointList.length; each++) {
                    var truck_item = $scope.trucksCheckpointList[each];
                    var markerIni = undefined;
                    var markerEnd = undefined;
                    if (truck_item.length > 0) {
                        var posIni = {
                            lat: parseFloat(truck_item[0]['lat']),
                            lng: parseFloat(truck_item[0]['lng'])
                        };
                        markerIni = $scope.addMapMarker(posIni, undefined, $scope.url_img_marker_start, undefined);

                        var len = truck_item.length - 1;
                        var posEnd = {
                            lat: parseFloat(truck_item[len]['lat']),
                            lng: parseFloat(truck_item[len]['lng'])
                        };
                        markerEnd = $scope.addMapMarker(posEnd, undefined, $scope.url_img_marker_end, undefined);
                    }
                    // Add Route
                    var itemRoute = $scope.addMapRoutes(truck_item);
                    $scope.trucksRoutesList.push([itemRoute, markerIni, markerEnd]);
                }
            }
        });

        $scope.$watch('trucksPositionList.length + mapRefreshInterval', function () {
            console.log("trucksPositionList watch...");
            if (!$scope.trucksPositionList) {
                return;
            }
            var each;
            //Clear old markers
            for (each = 0; each < $scope.trucksPositionMarker.length; each++) {
                $scope.trucksPositionMarker[each].setMap(null);
            }
            $scope.trucksPositionMarker = [];
            // Create a marker and set its position.
            for (each = 0; each < $scope.trucksPositionList.length; each++) {
                var item = $scope.trucksPositionList[each];
                var itemCoordinatesLength = item['coordinates'].length;
                var markerTitle = "Truck #" + item['id'];
                var url = $location.absUrl() + "/" + item['id'] + "/route";
                var infoContent = markerTitle + "<br/><a href=\"" + url + "\">show route</a>";
                var pos = {
                    lat: parseFloat(item['coordinates'][itemCoordinatesLength - 1]['lat']),
                    lng: parseFloat(item['coordinates'][itemCoordinatesLength - 1]['lng'])
                };
                var markerAnimation = null;
                if ($scope.mapRefreshInterval == 0) {
                    markerAnimation = google.maps.Animation.DROP;
                }
                var marker = $scope.addMapMarker(pos, markerAnimation, $scope.url_img_marker_item, markerTitle);
                $scope.trucksPositionMarker.push(marker);

                // Add Route
                if (itemCoordinatesLength > 1) {
                    var itemRoute = $scope.addMapRoutes(item['coordinates']);
                    $scope.trucksRoutesList.push([itemRoute, undefined, undefined]);
                }

                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', (function (marker, infocontent, infowindow) {
                    return function () {
                        infowindow.setContent(infocontent);
                        infowindow.open($scope.map, marker);
                        google.maps.event.addListener($scope.map, 'click', function () {
                            infowindow.close();
                        });
                    };
                })(marker, infoContent, infowindow));
            }
        });

        $scope.addMapMarker = function (position, animation, icon, title) {
            var marker = new google.maps.Marker({
                // map: $scope.map,
                position: position,
                draggable: false,
                // animation: google.maps.Animation.DROP,
                animation: animation,
                icon: icon,
                title: title
            });
            // To add the marker to the map, call setMap();
            marker.setMap($scope.map);
            return marker;
        };

        $scope.addMapRoutes = function (coordinates) {
            $scope.truckPlanCoordinates = [];
            for (var j = 0; j < coordinates.length; j++) {
                var pos = {
                    lat: parseFloat(coordinates[j]['lat']),
                    lng: parseFloat(coordinates[j]['lng'])
                };
                $scope.truckPlanCoordinates.push(pos);
            }
            var route = new google.maps.Polyline({
                path: $scope.truckPlanCoordinates,
                geodesic: true,
                strokeColor: '#2a36ff',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            route.setMap($scope.map);
            return route;
        };

        $scope.initMap = function () {
            $scope.mapLocation = {lat: 49.5969953, lng: 6.1374627};
//                getGeoLocation();

            $scope.map = new google.maps.Map(document.getElementById('google-maps'), {
                center: $scope.mapLocation,
                disableDefaultUI: true,
                zoomControl: true,
//                    mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                zoom: MAP_ZOOM
            });

            // Set the map's style to the initial value of the selector.
            // $scope.map.setOptions({styles: $scope.styles['retro']});
            $scope.setMapStyle($scope.theme_actived);

            if ($scope.traffic_layer_actived) {
                $scope.trafficLayer = new google.maps.TrafficLayer();
                $scope.trafficLayer.setMap($scope.map);
            }

            // if ($scope.itemId) {
            //     trackerApi.getTruckRoute($scope.itemId).then(function (resp) {
            //         $scope.trucksCheckpointList.push(resp.data);
            //     });
            // } else {
            //     trackerApi.getTrucksPosition().then(function (resp) {
            //         $scope.trucksPositionList = resp.data;
            //     });
            // }
            $scope.setMapInformationToShow();
            $scope.update_map_interval = $interval($scope.updateMapInformation, UPDATE_MAP_INTERVAL);
        };

        $scope.updateMapInformation = function () {
            console.log("update_map_interval...getting info (simulated) !");
            var item, itemCoordinatesLength;
            if (!$scope.itemId) {
                for (var each = 0; each < $scope.trucksPositionList.length; each++) {
                    item = $scope.trucksPositionList[each];
                    itemCoordinatesLength = item['coordinates'].length;
                    var itemCoordinates = item['coordinates'][itemCoordinatesLength - 1];
                    var min = 0.0;
                    var max = 0.002;
                    var n0 = Math.random() * (max - min) + min;
                    var n1 = Math.random() * (max - min) + min;
                    var direction = (each + Math.random() + Math.random()) % 4;
                    console.log("direction="+direction);
                    if (direction < 1) {
                        n0 = n0 * -1;
                    } else if (direction < 2) {
                        n1 = n1 * -1;
                    } else if (direction < 3) {
                        n0 = n0 * -1;
                        n1 = n1 * -1;
                    }

                    item['coordinates'].push({
                            lat: parseFloat(itemCoordinates['lat']) + n0,
                            lng: parseFloat(itemCoordinates['lng']) + n1
                        }
                    );
                }
            }
            $scope.mapRefreshInterval += 1;
            if ($scope.mapRefreshInterval % 10 == 0) {
                item = $scope.trucksPositionList[1];
                itemCoordinatesLength = item['coordinates'].length;
                // var lat = item['coordinates'][itemCoordinatesLength-1]['lat'];
                // var lng = item['coordinates'][itemCoordinatesLength-1]['lng'];
                $scope.setMapCenterCoordinates(item['coordinates'][itemCoordinatesLength - 1]);
            }
            // $scope.setMapInformationToShow();
        };

        $scope.setMapCenterCoordinates = function (coordinates) {
            $scope.map.setCenter(new google.maps.LatLng(coordinates['lat'], coordinates['lng']));
        };

        $scope.setMapInformationToShow = function () {
            if ($scope.itemId) {
                trackerApi.getTruckRoute($scope.itemId).then(function (resp) {
                    $scope.trucksCheckpointList.push(resp.data);
                });
            } else {
                trackerApi.getTrucksPosition().then(function (resp) {
                    $scope.trucksPositionList = resp.data;
                });
            }
        };

        $scope.getMapStyling = function () {
            $scope.styles = {
                default: null,
                retro: null,
                silver: null,
                dark: null,
                night: null,
                aubergine: null
            };
            $rootScope.map_styles_available = $scope.styles;
            // $scope.$emit('map.styling');

            var stylingPath = "/app/pages/tracker/google-maps/styling";

            $http.get(get_asset(stylingPath + "/retro.json")).then(function (resp) {
                $scope.styles['retro'] = resp.data;
                $http.get(get_asset(stylingPath + "/silver.json")).then(function (resp) {
                    $scope.styles['silver'] = resp.data;
                    $http.get(get_asset(stylingPath + "/dark.json")).then(function (resp) {
                        $scope.styles['dark'] = resp.data;
                        $http.get(get_asset(stylingPath + "/night.json")).then(function (resp) {
                            $scope.styles['night'] = resp.data;
                            $http.get(get_asset(stylingPath + "/aubergine.json")).then(function (resp) {
                                $scope.styles['aubergine'] = resp.data;
                                $scope.loadMap = true;
                            });
                        });
                    });
                });
            });
        };

        $scope.$on("$destroy", function handler() {
            if (angular.isDefined($scope.update_map_interval)) {
                $interval.cancel($scope.update_map_interval);
                console.log("update_map_interval stopped!");
            }
        });

        $timeout(function () {
            $scope.initialize();
        }, 100);
    }
})();
