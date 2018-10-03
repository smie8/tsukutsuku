
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
        //$('.kirjautuminen').hide();


        return false;
    } else {
        alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }


    //$.text('Tervetuloa junailemaan, ' + kirjautunut).appendTo('#tervetuloaKirjautunut');
    //document.getElementById('tervetuloaKirjautunut').innerHTML = "Tervetuloa junailemaan, " + kirjautunut;

}

var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');
var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));

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
        $("#asema1").attr("value", "");
        $("#asema2").attr("value", "");
    }

    $('#tervetuloaKirjautunut').text("");
    $('.kirjautuminen').show();

}


