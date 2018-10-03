/* alustaa drop-down menut joista valita lähtö- ja pääteasema*/
var lahtoasemanValinta = document.getElementById("lahtoasema");
var paateasemanValinta = document.getElementById("paateasema");
$.getJSON("files/asemat.json", function( data ) {
    $.each(data, function(index, d){
        var optio = document.createElement("option");
        optio.value = d.id;
        optio.innerText = d.asema;
        lahtoasemanValinta.appendChild(optio.cloneNode(true));
        paateasemanValinta.appendChild(optio.cloneNode(true));
    });
});

/* hakee junan tiedot digitrafficista*/
var taulukko = document.getElementById("haetuttiedot");
var xhr = new XMLHttpRequest();
var lahtoasema = "";
var paateasema = "";
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var tulos = JSON.parse(xhr.responseText);
            console.dir(tulos);
            // TO DO: myöhemmin tässä ohjataan käyttäjän valitseman toiminnallisuuden mukaiseen funktioon
            if (tulos.code === "TRAIN_NOT_FOUND") {
                console.log("ei junia")
                $("<span>").text("Ei junia annetuilla tiedoilla").appendTo("#haetuttiedot");
            } else {
                haePerusTiedot(tulos);
            }
        } else {
            alert("Haku epäonnistui");
            // lisätoiminnallisuuksia
        }

    }
};

/* lisää junan tiedot index.html:ään*/
function haePerusTiedot(tulos) {
    while (taulukko.firstChild) {
        taulukko.removeChild(taulukko.firstChild);
    }

    var muoto = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < tulos.length; ++i) {
        var juna = tulos[i];

        /* luodaan rivi, jolle kyseisen junan tiedot tallentuu */
        $("<tr>").attr("id", "rivi"+i).appendTo("#haetuttiedot");

        var j = 0;
        var k = juna.timeTableRows.length-1;
        /* haetaan lähtöaseman indeksi timeTableRowsista */
        for (var jj in juna.timeTableRows) {
            // testataan jyväskylällä
            if (juna.timeTableRows[jj].stationShortCode === lahtoasema && tulos[i].timeTableRows[jj].type === "DEPARTURE") {
                j = jj;
            }
        }
        /* haetaan pääteaseman indeksi timeTableRowsista */
        for (var kk in juna.timeTableRows) {
            if (juna.timeTableRows[kk].stationShortCode === paateasema && tulos[i].timeTableRows[kk].type === "ARRIVAL") {
                k = kk;
            }
        }

        var lahtoaika = new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", muoto);
        var saapumisaika = new Date(juna.timeTableRows[k].scheduledTime).toLocaleTimeString("fi", muoto);

        $("<td>").text(juna.trainType+juna.trainNumber).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[j].stationShortCode + " " + lahtoaika).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[k].stationShortCode + " " + saapumisaika).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[juna.timeTableRows.length-1].stationShortCode).appendTo("#rivi"+i);
    }
}

// TO DO: myöhemmin lisätään erilaisia hakutoiminnallisuuksia, jolloin pitää luoda URLia muokkaava funktio
var baseurl="https://rata.digitraffic.fi/api/v1";
var loppuurl = "/live-trains/station/"

$("#asema1").attr("value", kirjautunutHenkiloJson.lahto);
$("#asema2").attr("value", kirjautunutHenkiloJson.paate);

function haku() {
    lahtoasema = document.getElementById("asema1").value;
    paateasema = document.getElementById("asema2").value;
    kirjautunutHenkiloJson.lahto=lahtoasema;
    kirjautunutHenkiloJson.paate=paateasema;
    localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));

    console.log(lahtoasema);
    console.log(paateasema);

    // var currentTime = new Date();

    // tee if statementit

    kalenteri = document.getElementById("lahtopaiva").value.toString();
    var osoite = baseurl + loppuurl + lahtoasema + "/" + paateasema + "/?departure_date=" + kalenteri;
    console.log(osoite);
    xhr.open('get', osoite);
    xhr.send();
}


