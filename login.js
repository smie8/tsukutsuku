
function store() {

    var inputUsername = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    var kirjautumistiedot = { //JSON olio
        käyttäjänimi: inputUsername,
        salasana: inputPassword
    };
    if (!localStorage.getItem(inputUsername)) {
        localStorage.setItem(inputUsername, JSON.stringify(kirjautumistiedot));
        alert("Rekisteröinti onnistui!");
    } else {
        alert("Antamasi käyttäjätunnus on jo käytössä")
    }

}


function login() {
    var inputUsername= document.getElementById('username2');
    var inputPassword= document.getElementById('password2');
    var username = inputUsername.value;
    var password = inputPassword.value;
    var paikallinenData = JSON.parse(localStorage.getItem(username));
    if ((username == paikallinenData.käyttäjänimi) && (password == paikallinenData.salasana)) {
        alert("Tervetuloa palveluun " + paikallinenData.käyttäjänimi + "!");
        window.location.href = "Aloitus.html";
        return false;
    } else {
        alert("Virheellinen käyttäjätunnus ja/tai salasana");
    }
}// end login()
