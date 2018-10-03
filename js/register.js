function rekisterointi() {
    var inputUsername = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    var kirjautumistiedot = {
        käyttäjänimi: inputUsername,
        salasana: inputPassword,
        vari: "kel",
        lahto: "",
        paate: ""
    };
    //Tarkistetaan, onko käyttäjätunnusta olemassa ennestään
    if (!localStorage.getItem(inputUsername)) {
        localStorage.setItem(inputUsername, JSON.stringify(kirjautumistiedot));
        alert("Rekisteröinti onnistui!");
        localStorage.setItem('kirjautunutNyt', inputUsername);
        window.location.href = "index.html";
        return false;
    } else {
        alert("Antamasi käyttäjätunnus on jo käytössä")
    }
}