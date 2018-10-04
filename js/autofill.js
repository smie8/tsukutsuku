/* NF */

google.maps.event.addDomListener(window, 'load', intilize);

/* ===== automaattinen täyttö, kun hakee osoitetta ===== */
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

/* ===== asettaa oletukseksi kartan hakijan lokaation mukaan ===== */
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            gpslat = position.coords.latitude;
            gpslng = position.coords.longitude;
            initMap2()
        });
    } else {
        alert("Geopaikannusta ei ole tuettu tällä selaimella.")
        initMap2()
    }
}

/* ===== listaa haetun lokaation läheiset juna-asemat radius-muuttujan etäisyydeltä ===== */
function initMap2(l1,l2) {
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

/* ===== luo punaisen markerin kartalle asemien kohdalle ===== */
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

