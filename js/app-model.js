// the enterkey extender from http://jsfiddle.net/jamietre/VTQQA/

ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var inputSelector = 'input,textarea,select';
        $(document).on('keypress', inputSelector, function (e) {
            var allBindings = allBindingsAccessor();
            $(element).on('keypress', 'input, textarea, select', function (e) {
                var keyCode = e.which || e.keyCode;
                if (keyCode !== 13) {
                    return true;
                }

                var target = e.target;

                allBindings.enterkey.call(ViewModel, ViewModel, target, element);

                return false;
            });
        });
    }
};

//Place constructor for each location in JSON data
var Place = function(data) {
  this.name = ko.observable(data.name);
  this.category = ko.observable(data.categories[0].name);
  this.address = ko.observable(data.location.address);
  this.crossStreet = ko.observable(data.location.crossStreet);
  this.phone = ko.observable(data.contact.formattedPhone);
};

var ViewModel = function() {
  var self= this;
  //Search function bound to button
  self.find = function() {

    var searchTerm = $('#pac-input').val();
    var URL = 'https://api.foursquare.com/v2/venues/search?client_id=4PHZBYAAKCD000FPASUI5H3ZA3MLWBI3JGRW5FCW11A00LFD&client_secret=NPG5SY25INK5NQF21JOXIN40SM4LZH5DELESMLS4ZX2APWEA&v=20130815&ll=43.664582,-79.399516&query='+searchTerm;
      
    $.getJSON(URL, function(data) {
          //store the data
          if (data.response.venues.length>0 && searchTerm.length>0){
              //set fsData equal to the response 
              fsData = data.response.venues;
              //FOR DEBUG: console.log(fsdata);
              //reset the map
              reset();
              //change the menu icon
              menuIsOpen();
              //add click handler for menu icon
              $('.menu-icon').click(function(){
                if(!$('#place-list').hasClass("open")){
                  menuIsOpen();

                }else{
                  menuIsClosed();
                };
              });
            // put the data in ko.obs array as place objects
              fsData.forEach(function(placeItem){
                placeList.push(new Place(placeItem) );
              });
        //Create markers for each place in fsData
            var marker, i;

            for (var i = 0; i < fsData.length; i++) { 
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(fsData[i].location.lat, fsData[i].location.lng),
                icon: pin,
                map: MAP
              });

              //store the markers in an array for later
              markers.push(marker);

              //add click event to the markers on the map
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  markerChange(marker,i);
                  scrollToLi('#place-list',i);
                  highlightList(i); 
                }
              })(marker, i));

              //dbl click to fave
              google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {
                return function() {
                  markerFave(marker);
                  highlightList(i);
                }
              })(marker, i));
            }

          }else if (!searchTerm.length > 0) {
            alert("Looks like the search box is empty.. Please type in something to search for and  then click 'find'.");
          } else{
            alert("No results were found, try searching for something less specific.");
          }
    }).error(function(e) { alert("error"); });
};

  //marker change function bound to li header
  self.update = function(clickedPlace) {
    i = placeList.indexOf(clickedPlace);
    var clickedMarker = markers[i];

    highlightList(i);
    markerChange(clickedMarker, i);

  }
};


ko.applyBindings(new ViewModel());






 


