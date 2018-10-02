
function rekisterointi() {
    var inputUsername = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    var kirjautumistiedot = { //Luodaan JS objekti
        käyttäjänimi: inputUsername,
        salasana: inputPassword,
        vari: "pun"
    };
    //Tarkistetaan, onko käyttäjätunnusta olemassa ennestään
    if (!localStorage.getItem(inputUsername)) {
        localStorage.setItem(inputUsername, JSON.stringify(kirjautumistiedot));
        alert("Rekisteröinti onnistui!");
    } else {
        alert("Antamasi käyttäjätunnus on jo käytössä")
    }
}
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
        window.location.href = "Aloitus.html";
        return false;
    } else {
        alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }
}
//Aloitus.HTML sivulla olevan preferenssin talletus (Värivaihtoehto)
var kirjautunutHenkilo = localStorage.getItem('kirjautunutNyt');
var kirjautunutHenkiloJson = JSON.parse(localStorage.getItem(kirjautunutHenkilo));
var valinta = document.getElementById("valinnat").value;

document.getElementById("valinnat").value = kirjautunutHenkiloJson.vari;

function preferenssi() {
    valinta = document.getElementById("valinnat").value;
    kirjautunutHenkiloJson.vari=valinta;

    localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));

}


