
const express = require("express");
const morgan = require("morgan");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filenameData = __dirname + "/data.json";
const filenameFavorites = __dirname + "/favorites.json";
const filenameCourse = __dirname + "/course.json";
const axios = require('axios');
//Middleware
app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);
app.use(morgan("dev"));


// Client Credentials für die Authentifizierung
const clientCredentials = {
    client_id: '5aee2cfe-1709-48a9-951d-eb48f8f73a74',
    client_secret: '3309a57a-9214-40db-9abe-28b1bb30c08c',
    grant_type: 'client_credentials'
  };
  

//BasisUrl wird aufgerufen und aufgeteilt. Das Suchwort (filterword) wird hinten an die Url drangehängt, und die Url in eine "fullUrl" gespeichert und zurückgegeben.

  let ApiUrl_studienangebote = ""; 
  

  function filter_studienangebote(filterWord) {
      const baseUrl = "https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote";
      console.log('test' , filterWord);
      if (!filterWord) {
          console.error("Filterwort fehlt. Bitte ein gültiges Filterwort angeben.");
          return;
      }
  
      const fullUrl = `${baseUrl}?sw=${filterWord}`;
      ApiUrl_studienangebote = fullUrl;
      //console.log("Filter angewendet. Vollständige URL:", ApiUrl_studienangebote);
      makeRequest_Studienfach();
  }
  
// Aufrufe um ein Wort zu filtern
 // const filterWord = "Informatik";
  //filter_studienangebote(filterWord);
  

  //Diese Funktion nimmt die aktuelle Url "ApiUrl_studienangebote" und gibt nur die Informationen der gelisteten Parameter aus.
async function makeRequest_Studienfach() {
  console.log(ApiUrl_studienangebote);
  try {
    
    const response = await axios.get(ApiUrl_studienangebote, {
      headers: {
        'X-API-Key': clientCredentials.client_id
      },
    });
    
    console.log(response.data);
    extractBundesland(response.data.items);
    extractAbschlussgrad(response.data.items);
    extractStudienform(response.data.items);
    extractStudientyp(response.data.items);
    extractStudiengangmodell(response.data.items);
    extractHochschulart(response.data.items);
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error.message);
  }
}
function extractBundesland(items) {
  items.forEach(item => {
    const bundesland = item.studienangebot.region.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Bundesland: ${bundesland}, Studiengang: ${studiengang}`);
  });
}
function extractAbschlussgrad(items) {
  items.forEach(item => {
    const abschlussgrad = item.studienangebot.abschlussgrad.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Studiengangsabschlussgrad: ${abschlussgrad}, Studiengang: ${studiengang}`);
  });
}
function extractStudienform(items) {
  items.forEach(item => {
    const studienform = item.studienangebot.studienform.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Studienform: ${studienform}, Studiengang: ${studiengang}`);
  });
}
function extractStudientyp(items) {
  items.forEach(item => {
    const studientyp = item.studienangebot.studientyp.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Studientyp: ${studientyp}, Studiengang: ${studiengang}`);
  });
}
function extractStudiengangmodell(items) {
  items.forEach(item => {
    const studiengangmodel = item.studienangebot.studiengangmodel.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Studiengangmodel: ${studiengangmodel}, Studiengang: ${studiengang}`);
  });
}
function extractHochschulart(items) {
  items.forEach(item => {
    const hochschulart = item.studienangebot.hochschulart.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    //console.log(`Hochschulart: ${hochschulart}, Studiengang: ${studiengang}`);
  });
}

//makeRequest_Studienfach();


//Hier sind Post und Get Endpunkte für die Filter

app.post("/fetchData", async (req, res) => {
  try {
    makeRequest_Studienfach();
    res.status(200).json({ message: "Daten erfolgreich abgerufen" });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
});



app.get("/testFilter", async (req, res) => {
  const filterWord = req.query.filterWord;
  console.log('test');
  try {
    console.log(filterWord);
    filter_studienangebote(filterWord);

    console.log('Hier wird der GET-Endpoint ausgegeben');
    console.log(`Filter erfolgreich angewendet für: ${filterWord}`);

    res.status(200).json({ message: "Filter erfolgreich angewendet" });
  } catch (error) {
    res.status(400).json({ error: "Fehler beim Anwenden des Filters" });
  }
}).then(response)


//Endpoints
app.put("/data/:id", function (req, res) {
    fs.readFile(filenameData, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject[req.params.id].name = req.body.name;
        dataAsObject[req.params.id].bundesland = req.body.bundesland;
        dataAsObject[req.params.id].nc = req.body.nc;
        fs.writeFile(filenameData, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});
app.get("/data", function (req, res) {
    fs.readFile(filenameData, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});
app.get("/favorites", function (req, res) {
    fs.readFile(filenameFavorites, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});

//Api-Endpunkt zum Abrufen aller Daten
app.get("/course", function (req, res) {
    fs.readFile(filenameCourse, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});
app.delete("/favorites/:id", function (req, res) {
    fs.readFile(filenameFavorites, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.splice(req.params.id, 1);
        fs.writeFile(filenameFavorites, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});
app.post("/favorites", function (req, res) {
    console.log('Angekommene Daten:', req.body);
    fs.readFile(filenameFavorites, "utf8", function (err, data) {
      let dataAsObject = JSON.parse(data);
      dataAsObject.push({
          id: dataAsObject.length,
          name: req.body.name,
          ort: req.body.ort,
          courseId : req.body.courseId,
      })
      fs.writeFile(filenameFavorites, JSON.stringify(dataAsObject), () => {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(dataAsObject));
      });
    });
  });
//Api zum Abfragen einer bestimmten Id
app.get("/course/:id", function (req, res) {
    fs.readFile(filenameCourse, "utf8", function (err, data) {
        const dataAsObject = JSON.parse(data)[req.params.id];
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(dataAsObject));
    });
});



app.listen(port, () => console.log(`Server listening on port ${port}!`));
