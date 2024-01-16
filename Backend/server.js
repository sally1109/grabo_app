const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/weight.json";
const filename2 = __dirname + "/data.json";

const axios = require('axios');

//Middleware
app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);




//Studiensuche Datenbank

// Client Credentials für die Authentifizierung
const clientCredentials = {
    client_id: '5aee2cfe-1709-48a9-951d-eb48f8f73a74',
    client_secret: '3309a57a-9214-40db-9abe-28b1bb30c08c',
    grant_type: 'client_credentials'
  };
  
 
  async function makeRequest() {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-API-Key': clientCredentials.client_id
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error.message);
      throw new Error('Fehler bei der Token-Erstellung', error.message);
    }
  }


  
  //API Anfrage fuer ein Suchwort
  const apiUrl_Suchwort = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?';
  
  async function makeRequestSuchwort(searchWord) {
    try {
      const response = await axios.get(apiUrl_Suchwort, {
        headers: {
          'X-API-Key': clientCredentials.client_id,
        },
        params: {
          sw: searchWord,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error.message);
      throw new Error('Fehler bei Token-Erstellimg 02', error.message);
    }
  }


//----------------------------- API Abfrage mit Filterfunktion ------------------------------------------------

 //Genrelle Abfrage an API für Studieninformationen (ohne Filter)
 const apiUrl = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfeldinformationen?';
  
  //Filter Angaben. Hier Parameter reinschreiben
  const filters = {
    dkz: '94014',
    sw: 'Forstwissenschaft',
  };

  //Filter, der die apiUrl nimmt, einen Seperator der auf Und oder Fragezeichen parameter prüft und die Eingabe vom Filter hinten anhängt
  //Das Ganze wird mir "map" hinten angehängt, dabei ist der Key der Abkürzungsparameter (dkz, sw...) und Value der jeweilige zugeordnete Stringeintrag
  function filter_dkz(apiUrl, filters) {
    if (!apiUrl || !filters) {
      throw new Error('apiUrl und filters sind erforderlich.');
    }
  
    const separator = apiUrl.includes('?') ? '&' : '?';
  
    const filter_dkz = `${apiUrl}${separator}${Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')}`;
  
    return filter_dkz;
  }


  //Die Funktion wird aufgerufen und die Ausgabe in filter_suchwort gespeichert 
  //Die Ausgaben werden ind er Console angezeigt
  const filter_suchwort = filter_dkz(apiUrl, filters);
  console.log('Filter-DKZ:', filter_dkz);


  //API Anfrage fuer ein Studienfach, mit dem Filtereintrag aus filter_suchwort
  const apiUrl_Studienfach = `${filter_suchwort}`;







  
    async function makeRequest_Studienfach() {
      try {
        const response = await axios.get(apiUrl_Studienfach, {
          headers: {
            'X-API-Key': clientCredentials.client_id
          },
        });
        // Ausgabe der API-Antwort
        console.log(response.data);
      } catch (error) {
        console.error('Fehler bei der Anfrage:', error.message);
        throw new Error('Fehler bei Token-Erstellimg 02', error.message);
      }
    }
  
  // Ausführung der Anfrage
  //makeRequestSuchwort(Informatik);
  //makeRequest();
  makeRequest_Studienfach();
  console.log('API-URL für Studienfach:', apiUrl_Studienfach);





//Endpoints
app.get("/weight", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});

app.get("/weight/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        const dataAsObject = JSON.parse(data)[req.params.id];
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(dataAsObject));
    });
});

app.put("/weight/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject[req.params.id].weight = req.body.weight;
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.delete("/weight/:id", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.splice(req.params.id, 1);
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.post("/weight", function (req, res) {
    fs.readFile(filename, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject.push({
            id: dataAsObject.length,
            weight: req.body.weight,
            date: req.body.date
        });
        fs.writeFile(filename, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.put("/data/:id", function (req, res) {
    fs.readFile(filename2, "utf8", function (err, data) {
        let dataAsObject = JSON.parse(data);
        dataAsObject[req.params.id].name = req.body.name;
        dataAsObject[req.params.id].height = req.body.height;
        dataAsObject[req.params.id].age = req.body.age;
        fs.writeFile(filename2, JSON.stringify(dataAsObject), () => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(dataAsObject));
        });
    });
});

app.get("/data", function (req, res) {
    fs.readFile(filename2, "utf8", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));