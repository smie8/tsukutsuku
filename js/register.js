function rekisterointi() {
    var inputUsername = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    var kirjautumistiedot = { //Luodaan JS objekti
        käyttäjänimi: inputUsername,
        salasana: inputPassword,
        vari: "pun",
        lahto: "",
        paate: ""
    };
    //Tarkistetaan, onko käyttäjätunnusta olemassa ennestään
    if (!localStorage.getItem(inputUsername)) {
        localStorage.setItem(inputUsername, JSON.stringify(kirjautumistiedot));
        alert("Rekisteröinti onnistui!");
        kirjautuminenRekisteroinninJalkeen(inputUsername, inputPassword);
        //window.location.href = "index.html";
        return false;
    } else {
        alert("Antamasi käyttäjätunnus on jo käytössä")
    }

    function kirjautuminenRekisteroinninJalkeen(kayttajanimi, salasana) {


 /*       var inputUsername = document.getElementById('username2');
        var inputPassword = document.getElementById('password2');
        var username = inputUsername.value;
        var password = inputPassword.value;*/
        var paikallinenData = JSON.parse(localStorage.getItem(kayttajanimi));
        //Sisäänkirjautuminen
        var kirjautunut = paikallinenData.käyttäjänimi;
        localStorage.setItem('kirjautunutNyt', kirjautunut);
        alert("Tervetuloa palveluun " + paikallinenData.käyttäjänimi + "!");
        window.location.href = "index.html";
            //$('.kirjautuminen').hide();
        return false;
    }

}