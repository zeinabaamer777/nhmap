var map;
// creat a blank array for all markers.
var markers =[];

//My Google Maps Demo {lat: 30.166921, lng: 30.482845}
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.166921, lng: 30.482845},
        zoom: 8
    });


//list od malls in egypt
var locations = [{
    title: 'San Stefano Grand Plaza Mall',
    locations: {lat: 31.245755, lng: 29.965982},
    address: 'El-Gaish Rd san Stefano Qism El-Raml  Alexandria Governorate' ,
    description: ' is a structural complex including a Four Seasons hotel, apartments, offices, a shopping mall and a marina in Alexandria, Egypt. It was designed by WZMH Architects.'
},
{
    title: 'Dandy mega mall',
    locations: {lat: 30.064334, lng: 31.027134},
    address: 'Alexandria Desert Rd Giza Governorate',
    description:'This was the first mall opened in this area near beside the smart village in Giza Egypt. Nice place good location, Verry attractive . The mall provide many ceremonies and festivals all the year long. '
},
{
    title: 'Cairo Festival City',
    location: {lat: 30.028461, lng: 31.405400},
    address: 'Cairo Festival City Nasr City Cairo Governorate',
    description: 'Spanning a land area of over 3 million sq. m (700 acres), Cairo Festival City is a visionary mixed-use urban community strategically located at the gateway to New Cairo city. Cairo Festival City sets new standards as Egypt’s premier indoor-outdoor shopping, dining and entertainment destination, providing spectacular residential villas and luxurious apartments'
},
{
    title: 'CityStars',
    location: {lat: 30.075086, lng: 31.346283},
    address: 'Omar Ibn El-Khattab, Masaken Al Mohandesin, Nasr City, Cairo Governorate',
    description: 'Building on our previous achievements and unique position in the Egyptian market, as an icon and pioneer in the world of premium quality mixed-use real estate developments in Egypt through our mega real estate integrated project of Citystars Heliopolis in Cairo'
},
{
    title: 'Mall of Arabia',
    location: {lat: 30.007451, lng: 30.973523},
    address: '26th of July Corridor, Giza Governorate',
    description: 'Since the launch of Mall of Arabia Cairo in December 2010, the Group has invested extensively in the areas of retail development and fashion retail in Egypt. Based on the Group positive outlook for the Egyptian economy.'
},
{
    title: 'Mall of Egypt',
    location: {lat: 30.007303, lng: 30.973523},
    address: 'Al Wahat Road Giza، 6th of October City، Giza Governorate',
    description: 'Mall of Arabia is Egypt Biggest Mall in terms of space and number of stores'
}
];
var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();
//this group uses the location array to creat array of markers on initialize.
for (var i = 0; i < locations.length; i++) {
    // get the position from the location array
    var position = locations[i].location;
    var title = locations[i].title;
    var address = locations[i].address;
    var description = locations[i].description;
    //creat a marker per location and put into markers array.
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        address : address,
        description : description,
        animation: google.maps.Animation.DROP,
        id: i
    });
    //push the marker to our array of markers.
    markers.push(marker);
    //extend the boundaries of the map for each marker
    bounds.extend(marker.position);
    //creat an onclick event to open an infowindows at each marker.
    marker.addlistener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });
}
map.fitBounds(bounds);
}
//this function popualates the infowindow when the marker is clicked.
//one infowindow which will open at the marker that is clicked and populate based
//on that markers position.
function populateInfoWindow(marker, infowindow) {
    //check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div><h1>'+marker.title+'</h1><br>'+'<h3>description:</h3><p>'+marker.description+'</p></br></div');
        infowindow.open(map, marker);
        //to make sure the marker property is cleared if the infowindow is colsed.
        infowindow.addlistener('closeclick',function() {
            infowindow.setMarker(null);
        });
    }
}
