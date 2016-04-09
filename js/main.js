"use strict"
  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.762418, lng: -122.417578},
      zoom: 8
    });
    var locations = [];

    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    $.get("https://data.sfgov.org/resource/w969-5mn4.json", function(data){
      locations = data;
      for (var i = locations.length - 1; i >= 0; i--) {

        var location = locations[i];

        var myLatlng = new google.maps.LatLng(location.latitude.latitude, location.latitude.longitude);

        var marker = new google.maps.Marker({
            position: myLatlng,
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent("<p>Location Name: " + locations[i].addr_num + "</p><br>" + "<p>Address: " + locations[i].yr_inst + "</p><br>" + "<p># of Spaces: " + locations[i].spaces + "</p>");
                infowindow.open(map, marker);
            }
        })(marker, i));

        marker.setMap(map);

        bounds.extend(marker.position);

        // $("<p>"+ location.addr_num + "</p>").appendTo("#content");
      }
      map.fitBounds(bounds);
    });
  };

$(document).ready(function(){

});
