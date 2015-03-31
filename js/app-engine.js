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
// make a marker for mylocation
var youAreHere = new google.maps.Marker({
    position: myLocation,
    map: MAP
});
//different types of MARKERS
var pin = 'img/place.png';
var visitedPin = 'img/placeg.png';
var favePin = 'img/placep.png';

//MARKER-CHANGING FUNCTIONS
// function for indicated which location has been clicked 
var markerChange = function(marker, index) {
  var infowindow = new google.maps.InfoWindow();
  var content = '<h2>'+fsData[index].name+'</h2>'+
                '<h5>'+fsData[index].categories[0].name+'</h5>'+
                '<p>'+fsData[index].contact.formattedPhone+'</p>'+
                '<p>'+fsData[index].location.address+'</p>';
  if(marker.icon != favePin){
      marker.setIcon(visitedPin);
  };
  infowindow.setContent(content);
  infowindow.open(MAP, marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){ marker.setAnimation(null); }, 750);
};
var markerFave = function(marker) {
                marker.setIcon(favePin);
};

//CLEARING FUNCTIONS
//to clear the map of markers to use in reset
var clearPins = function() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
};
//to clear pins and list 
var reset = function(){
  clearPins();
  placeList([]);
};

//FUNCTIONS TO OPEN CLOSE MENU 
var menuIsOpen = function(){
  $('#place-list').addClass("open");
  $('.menu-icon').removeClass("hidden");
  $('.menu-icon').attr('src', 'img/close.png');
  $('#place-list').show();
};

var menuIsClosed = function(){
  $('#place-list').removeClass("open");
  $('.menu-icon').attr('src', 'img/menu.png');
  $('#place-list').hide();
};

//FUNCTION FOR LIST 
//place border around  li corresponding to the location selected
var highlightList = function(index) {
  var n = index + 1;
  var selectedLi = 'li:nth-child(' + n + ')';
  $('li').removeClass("active");
  $(selectedLi).addClass("active");
};
//scroll to li the within a conatiner (add id of container)  corresponding to the location selected
var scrollToLi = function(id, index) { 
              $(id).animate({
                    scrollTop: index*190
                  },800);
};