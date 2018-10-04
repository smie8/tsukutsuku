var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');

/* ===== asettaa oletus-käyttäjän kirjautuneeksi ===== */
/* ET, NF, SE */
if (!kirjautunutHenkilo) {
    localStorage.setItem("oletus", JSON.stringify({käyttäjänimi: "oletus", salasana: "",
        vari: "kel", lahto: "", paate: ""}));
    localStorage.setItem("kirjautunutNyt", JSON.parse(localStorage.getItem("oletus")).käyttäjänimi);
    /* Asetetaan kirjautuneeksi henkilöksi oletus, mikäli kirjautunut henkilö oli null tai undefined */
    kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');
}

var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));

/* ET, NF, SE */
function palautaJSONdata(username) {
    var paikallinenData = JSON.parse(localStorage.getItem(username));
    return paikallinenData;
}

/* ===== väriteeman valinta väriteema-valikosta ===== */
/* ET, (SE) */
function muutaVaripreferenssi() {
    var valinta = document.getElementById("valinnat").value;
    $("body, #haetuttiedot tr:nth-child(even), #taulukonOtsikkorivi, #yläpalkki, #karttaboksi").attr("class", valinta);

    if (kirjautunutHenkilo !== "oletus") {
        kirjautunutHenkiloJson.vari = valinta;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }
}

/* ===== tarkistaa sisäänkirjautuneen väri- ja asemapreferenssit ===== */
/* ET, (SE) */
function preferenssit(käyttäjänimi) {
    henkilonData = palautaJSONdata(käyttäjänimi);
    $("body, #haetuttiedot tr:nth-child(even), #taulukonOtsikkorivi, #yläpalkki, #karttaboksi").attr("class", henkilonData.vari);
    $("#asema1").attr("value", henkilonData.lahto);
    $("#asema2").attr("value", henkilonData.paate);
}

/* ===== tarkistaa onko syötetty käyttäjänimi ja salasana oikein ja kirjautuu sisään ===== */
/* NF, SE */
function kirjautuminen(event) {
    event.preventDefault();
    var username = document.getElementById('username2').value;
    var password = document.getElementById('password2').value;
    var henkilonData = palautaJSONdata(username);
    if (henkilonData) {
        if (username == henkilonData.käyttäjänimi) {
            if (password == henkilonData.salasana) {
                var kirjautunutHenkilo = henkilonData.käyttäjänimi;
                localStorage.setItem('kirjautunutNyt', kirjautunutHenkilo);
                alert("Tervetuloa palveluun " + kirjautunutHenkilo + "!");
                window.location.href = "index.html";
                return false;
            } else {
                alert("Virheellinen käyttäjätunnus ja/tai salasana");
            }
        }
    } else {
        alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }
}

/* ===== kirjautuu ulos ja asettaa asemapreferenssit tyhjiksi ===== */
/* ET, NF, SE */
function kirjauduUlos() {
    if(kirjautunutHenkilo !== "oletus"){
        localStorage.setItem('kirjautunutNyt', "oletus");
        //kirjautunutHenkilo = "oletus";
        $("#asema1").attr("value", "");
        $("#asema2").attr("value", "");
        window.location.href = "index.html";
    }
}

