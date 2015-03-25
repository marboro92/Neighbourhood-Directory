$(function(){
  var placeNames = [
    { value: 'Bakery'},
    { value: 'Books'},
    { value: 'Brewery'},
    { value: 'Beer'},
    { value: 'Bistro'},
    { value: 'Burgers'},
    { value: 'Burrito'},
    { value: 'Chinese' },
    { value: 'Coffee'},
    { value: 'Cafe'},
    { value: 'Clinic'},
    { value: 'Dessert'},
    { value: 'Donut'},
    { value: 'Deli'},
    { value: 'Espresso'},
    { value: 'Fries'},
    { value: 'Frozen Yogurt'},
    { value: 'Gallery'},
    { value: 'Greek'},
    { value: 'Grocery'},
    { value: 'Hospital'},
    { value: 'Ice Cream'},
    { value: 'Indian'},
    { value: 'Japanese'},
    { value: 'Korean'},
    { value: 'Library'},
    { value: 'Mexican'},
    { value: 'Pizza'},
    { value: 'Pharmacy'},
    { value: 'Pet Store'},
    { value: 'Park'},
    { value: 'Pasta'},
    { value: 'Pub'},
    { value: 'Restaurant'},
    { value: 'Shoes'},
    { value: 'Steakhouse'},
    { value: 'Shawarma'},
    { value: 'Sandwich'},
    { value: 'Salon'},
    { value: 'Station'},
    { value: 'Tutor'},
    { value: 'Tapas'}, 
    { value: 'Sushi'},
    { value: 'Wings'}

  ];
  
  // setup autocomplete function pulling from currencies[] array
  $('#pac-input').autocomplete({
    lookup: placeNames
    // onSelect: function (suggestion) {
    //   var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
    //   $('#outputcontent').html(thehtml);
    // }
  });
  

});