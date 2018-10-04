
google.maps.event.addDomListener(window, 'load', intilize);

function intilize() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("automaattinentäyttö"));
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var paikka = autocomplete.getPlace();
        var latitude = paikka.geometry.location.lat();
        var longi = paikka.geometry.location.lng();
        initMap2(latitude, longi);

    });
};

var gpslat;
var gpslng;
var map;
var infowindow;

function initMap() {


    navigator.geolocation.getCurrentPosition(function (position) {
        gpslat = position.coords.latitude;
        gpslng = position.coords.longitude;
        console.dir(position)
        initMap2()
    });
}
function initMap2(l1,l2) {
    console.log("Moro");

    var sijainti;
    if (!l1) {
        if (!l2) {
            sijainti = {lat: gpslat, lng: gpslng};
        }
    } else {
        sijainti = {lat: l1, lng: l2};
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: sijainti,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: sijainti,
        //location: {lat: 65.06195509999999, lng: 25.50019580000003},
        radius: 10000,
        type: ['train_station']
    }, callback);
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

