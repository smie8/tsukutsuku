
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
//Aloitus.HTML sivulla olevan preferenssin talletus (Värivaihtoehto)

// korjaile myöh.:

var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');
var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));
//var valinta = document.getElementById("valinnat").value;

//document.getElementById("valinnat").value = kirjautunutHenkiloJson.vari;

function preferenssi() {
    var valinta = document.getElementById("valinnat").value;
    $("body").attr("class", valinta);

    if(kirjautunutHenkilo !== undefined){
        console.log("Joku on kirjautunut sisään");
        kirjautunutHenkiloJson.vari=valinta;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }
}

function kirjauduUlos() {

    if(kirjautunutHenkilo !== undefined){
        localStorage.setItem('kirjautunutNyt', undefined);
        kirjautunutHenkilo = undefined;
    }

}


