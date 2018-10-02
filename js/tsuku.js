


/* alustaa drop-down menut joista valita lähtö- ja pääteasema*/
// to do: luetaan tiedostolta lista kaikista suomen asemista
var asemat = {HKI: "Helsinki", JY: "Jyväskylä", KUO: "Kuopio", LH: "Lahti", OL: "Oulu",
    ROI: "Rovaniemi", TPE: "Tampere", TKU: "Turku"};
var lahtoasemanValinta = document.getElementById("lahtoasema");
var paateasemanValinta = document.getElementById("paateasema");
for (var id in asemat) {
    var optio = document.createElement("option");
    optio.value = id;
    optio.innerText = asemat[id];
    lahtoasemanValinta.appendChild(optio.cloneNode(true));
    paateasemanValinta.appendChild(optio.cloneNode(true));
}

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
            haePerusTiedot(tulos);
        } else {
            alert("Haku epäonnistui");
            // lisätoiminnallisuuksia
        }

    }
};

function haePerusTiedot(tulos) {
    while (taulukko.firstChild) {
        taulukko.removeChild(taulukko.firstChild);
    }
    // ks. jostain mistä nämä tulevat
    var muoto = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < tulos.length; ++i) {
        var juna = tulos[i];
        $("<tr>").attr("id", "rivi"+i).appendTo("#haetuttiedot");

        var j = 0;
        var k = juna.timeTableRows.length-1;

        // TO DO: koodissa on toistoa, muokkaa vähemmän haisevaksi
        // haetaan lähtöaseman indeksi timeTableRowsista
        for (var jj in juna.timeTableRows) {
            // testataan jyväskylällä
            if (juna.timeTableRows[jj].stationShortCode === lahtoasema && tulos[i].timeTableRows[jj].type === "DEPARTURE") {
                j = jj;
            }
        }
        // haetaan pääteaseman indeksi timeTableRowsista
        for (var kk in juna.timeTableRows) {
            if (juna.timeTableRows[kk].stationShortCode === paateasema && tulos[i].timeTableRows[kk].type === "ARRIVAL") {
                k = kk;
            }
        }

        var lahtoaika = new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", muoto);
        var saapumisaika = new Date(juna.timeTableRows[k].scheduledTime).toLocaleTimeString("fi", muoto);

        $("<td>").text(juna.trainCategory).appendTo("#rivi"+i);
        $("<td>").text(lahtoaika).appendTo("#rivi"+i);
        $("<td>").text(saapumisaika).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[juna.timeTableRows.length-1].stationShortCode).appendTo("#rivi"+i);
    }
}

// TO DO: myöhemmin lisätään erilaisia hakutoiminnallisuuksia, jolloin pitää luoda URLia muokkaava funktio
var baseurl="https://rata.digitraffic.fi/api/v1";
var loppuurl = "/live-trains/station/"

function haku() {
    lahtoasema = document.getElementById("lahtoasema").value;
    paateasema = document.getElementById("paateasema").value;
    console.log(lahtoasema);
    console.log(paateasema);
    var osoite = baseurl + loppuurl + lahtoasema + "/" + paateasema;
    console.log(osoite);
    xhr.open('get', osoite);
    xhr.send();
}


