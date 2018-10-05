// NF, SE, (ET)
function rekisterointi() {
    var inputUsername = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    var kirjautumistiedot = {
        käyttäjänimi: inputUsername,
        salasana: inputPassword,
        vari: "kel",
        lahto: "",
        paate: ""
    };
    // Tarkistetaan, onko käyttäjätunnusta olemassa ennestään
    if(!regularExpression.test(inputPassword)) {
        alert("Salasanassa tulee olla vähintään yksi erikoismerkki ja yksi numero");
    }else {
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
}