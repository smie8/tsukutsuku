// DONE
localStorage.setItem("oletus", JSON.stringify({käyttäjänimi: "oletus", salasana: "",
    vari: "kel", lahto: "", paate: ""}));


// DONE
var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');
var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));

//asetaKirjautunut("oletus");

// function asetaKirjautunut(avain) {
//     /* kirjautunut on JSON olio */
//     localStorage.setItem('kirjautunutNyt', localStorage.getItem(avain).käyttäjänimi);
// }

// DONE
function kirjautuminen() {
    var inputUsername= document.getElementById('username2');
    var inputPassword= document.getElementById('password2');
    var username = inputUsername.value;
    var password = inputPassword.value;
    var paikallinenData = JSON.parse(localStorage.getItem(username));
    //Sisäänkirjautuminen
    if ((username == paikallinenData.käyttäjänimi) && (password == paikallinenData.salasana)) {
        //Luodaan muuttuja, joka kertoo kuka on sisäänkirjautuneena.
        var kirjautunut = paikallinenData.käyttäjänimi;
        localStorage.setItem('kirjautunutNyt', kirjautunut);
        alert("Tervetuloa palveluun " + paikallinenData.käyttäjänimi + "!");
        window.location.href = "index.html";
        return false;
    } else {
        alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }
}

// DONE
function preferenssi() {
    var valinta = document.getElementById("valinnat").value;
    $("body").attr("class", valinta);

    if(kirjautunutHenkilo !== undefined){
        console.log("Joku on kirjautunut sisään");
        kirjautunutHenkiloJson.vari=valinta;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }
}

// DONE
function kirjauduUlos() {

    if(kirjautunutHenkilo !== undefined){
        localStorage.setItem('kirjautunutNyt', undefined);
        kirjautunutHenkilo = undefined;
        $("#asema1").attr("value", "");
        $("#asema2").attr("value", "");
    }

}


