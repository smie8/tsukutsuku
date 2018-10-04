/* globaalit yms. */

var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');

console.log("Kirjautunut henkilö1: " + kirjautunutHenkilo);

if (!kirjautunutHenkilo) {
    localStorage.setItem("oletus", JSON.stringify({käyttäjänimi: "oletus", salasana: "",
        vari: "kel", lahto: "", paate: ""}));
    localStorage.setItem("kirjautunutNyt", JSON.parse(localStorage.getItem("oletus")).käyttäjänimi);
    kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt'); // Asetetaan tällä kirjautuneeksi henkilöksi oletus, mikäli kirjautunut henkilö oli null tai undefined

}

var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));

function palautaJSONdata(username) {
    var paikallinenData = JSON.parse(localStorage.getItem(username));
    return paikallinenData;
}

/* väriteeman valinta: */

//$("body").attr("class", kirjautunutHenkiloJson.vari);

function muutaVaripreferenssi() {
    var valinta = document.getElementById("valinnat").value;
    $("body").attr("class", valinta);
    if (kirjautunutHenkilo !== "oletus") {
        kirjautunutHenkiloJson.vari = valinta;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }
}

// TÄMÄN ALLA OLEVAN VOINEE POISTAA? -----------------------------------------------------------------------------------
/*function preferenssi() {
    var valinta = document.getElementById("valinnat").value;
    // TO DO: lisää tarvittaessa muihinkin elementteihin sopiva class
    // mikäli väriteema halutaan näkymään muussakin
    $("body").attr("class", valinta);

    /!* muutetaan sisäänkirjautuneen henkilön väripreferenssi niin että muistetaan jatkossakin,
     * ei vaikuta oletuskäyttäjään *!/
    if(kirjautunutHenkilo !== "oletus"){
        kirjautunutHenkiloJson.vari=valinta;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }
}
-----------------------------------------------------------------------------------------------------------------------*/

function preferenssit(käyttäjänimi) {
    henkilonData = palautaJSONdata(käyttäjänimi);
    $("body").attr("class", henkilonData.vari);
    $("#asema1").attr("value", henkilonData.lahto);
    $("#asema2").attr("value", henkilonData.paate);
}

function kirjautuminen(event) {
    event.preventDefault();
    var username = document.getElementById('username2').value;
    var password = document.getElementById('password2').value;
    //kirjauduSisaan(username, password);
    var henkilonData = palautaJSONdata(username);
    if (henkilonData) {
        console.log(henkilonData.käyttäjänimi);
        if ((username == henkilonData.käyttäjänimi) && (password == henkilonData.salasana)) {
            var kirjautunutHenkilo = henkilonData.käyttäjänimi;
            localStorage.setItem('kirjautunutNyt', kirjautunutHenkilo);
            alert("Tervetuloa palveluun " + kirjautunutHenkilo + "!");
            window.location.href = "index.html";
            return false;
        }
    } else {
            console.log("väärä");
            alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }
}


function kirjauduUlos() {
    if(kirjautunutHenkilo !== "oletus"){
        localStorage.setItem('kirjautunutNyt', "oletus");
        //kirjautunutHenkilo = "oletus";
        $("#asema1").attr("value", "");
        $("#asema2").attr("value", "");
        window.location.href = "index.html";
    }

}