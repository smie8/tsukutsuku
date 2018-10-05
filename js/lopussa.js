/* ===== uloskirjautumisnapin piilotus ===== */
/* SE */
if (kirjautunutHenkilo == "oletus") {
    $('.piilotaKunOletus').hide();
} else {
    $('.piilotaKunOletus').show();
}

/* ===== asemavalikkojen alustus listasta asemia ===== */
/* ET, (TT) */
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

/* ===== sisäänkirjautumisalueen piilotus ===== */
/* ET, SE */
if ((kirjautunutHenkilo !== "oletus") && (kirjautunutHenkilo !== null) && (kirjautunutHenkilo !== undefined)) {
    console.log("tulostaaaa");
    $(".piilotaKunKirjautunut").hide();
    $("<i>person</i>").attr("class", "material-icons").css('font-size', '16px').appendTo('#tervetuloa');
    $("#tervetuloa").append(" " + kirjautunutHenkiloJson.käyttäjänimi); // .after("<span>&nbsp;&nbsp;</span>")



}

/* ===== asettaa sisäänkirjautuneen käyttäjän preferenssit voimaan ===== */
preferenssit(kirjautunutHenkilo);

/* ===== hakee junan tiedot digitrafficista sekä alustaa taulukon bodyn ===== */
/* ET, (TT) */
var taulukko = document.getElementById("haetuttiedot");
var xhr = new XMLHttpRequest();
var lahtoasema = "";
var paateasema = "";
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var tulos = JSON.parse(xhr.responseText);
            console.dir(tulos);
            if (tulos.code === "TRAIN_NOT_FOUND") {
                tyhjennaTaulukko(taulukko);
                $("<span>").text("Suoria yhteyksiä ei löytynyt").appendTo("#haetuttiedot");
            } else {
                haePerusTiedot(tulos);
            }
        } else {
            alert("Haku epäonnistui");
        }

    }
};

/* lisää junan tiedot index.html:ään*/
/* ET, (SE), (TT) */
function haePerusTiedot(tulos) {
    tyhjennaTaulukko(taulukko);

    var muoto = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < tulos.length; ++i) {
        var juna = tulos[i];

        /* luodaan rivi, jolle kyseisen junan tiedot tallentuu */
        $("<tr>").attr("id", "rivi"+i).appendTo("#haetuttiedot");

        var j = 0;
        var k = juna.timeTableRows.length-1;
        /* haetaan lähtöaseman indeksi timeTableRowsista */
        for (var jj in juna.timeTableRows) {
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
        $("<td>").text(juna.departureDate + " " + juna.timeTableRows[j].stationShortCode + " " + lahtoaika).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[k].stationShortCode + " " + saapumisaika).appendTo("#rivi"+i);
        $("<td>").text(juna.timeTableRows[juna.timeTableRows.length-1].stationShortCode).appendTo("#rivi"+i);
    }
    preferenssit(kirjautunutHenkilo);
}

/* muuttumattomat url-osat */
var baseurl="https://rata.digitraffic.fi/api/v1";
var loppuurl = "/live-trains/station/";

/* ===== muodostaa url:n käyttäjän valinnoista ja avaa yhteyden junadataan ===== */
/* ET, (TT) */
function haku() {
    lahtoasema = document.getElementById("asema1").value;
    paateasema = document.getElementById("asema2").value;
    if (kirjautunutHenkilo !== "oletus") {
        kirjautunutHenkiloJson.lahto=lahtoasema;
        kirjautunutHenkiloJson.paate=paateasema;
        localStorage.setItem(kirjautunutHenkilo, JSON.stringify(kirjautunutHenkiloJson));
    }

    valittuPaiva = document.getElementById("lahtopaiva").value.toString();
    var osoite = baseurl + loppuurl + lahtoasema + "/" + paateasema + "/?departure_date=" + valittuPaiva;
    xhr.open('get', osoite);
    xhr.send();
}

/* ET */
function tyhjennaTaulukko(taulukko) {
    while (taulukko.firstChild) {
        taulukko.removeChild(taulukko.firstChild);
    }
}


function piilota(event) {
    //var piilotettavaAlue = event.target.nextElementSibling;
    var piilotettavaAlue = document.getElementById(".junakuvat");
    if (piilotettavaAlue.style.display === "none") {
        console.log("testi1");
        haekuvaa();
        piilotettavaAlue.style.display = "block";
    } else {
        console.log("testi2");
        piilotettavaAlue.style.display = "none";
    }
}

/* ===== hakee flickristä juna-aiheisia kuvia ===== */
/* ET */
function haekuvaa() {
    // if junakuvat.nextSibling (tms) -->
    $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?', {
        tags: "train",
        tagmode: "any",
        format: "json"
    }).done(function (data) {
        $(".junakuva").remove();
        console.dir(data);
        // voi käyttää jQueryn funktiota each()
        for (var i = 0; i < data.items.length; i++) {
            $("<img>").attr("src", data.items[i].media.m).attr("class", "junakuva").appendTo(".junaKuvat");
        }
    });
}