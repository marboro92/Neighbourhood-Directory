//Variables to be filled with relative JSON
var fsData = '';
var placeList = ko.observableArray([]);
var markers = [];

//Variables for initializing the google map
var myLocation = new google.maps.LatLng(43.664582, -79.399516);
var mapOptions = {
            center: myLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
          };
var MAP = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
var infowindow = new google.maps.InfoWindow();
// make a marker for mylocation
var youAreHere = new google.maps.Marker({
    position: myLocation,
    map: MAP
});
// function for indicated which location has been clicked 
var markerChange = function(marker, i) {
    marker.setIcon('img/placeg.png');
    infowindow.setContent(fsData[i].name);
    infowindow.open(MAP, marker);
    marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 750);
};
//to clear the map of markers
var clearPins = function() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
};
//to cleaar pins and list 
var reset = function(){
  clearPins();
  placeList([]);
};