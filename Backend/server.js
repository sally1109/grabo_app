
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
  
  
  let extractedData = [];
  let maxPg = 1;
  
  async function filter_studienangebote(filterWord) {
      const baseUrl = "https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote";
      if (!filterWord && filterWord.length == 0) {
          console.error("Filterwort fehlt. Bitte ein gültiges Filterwort angeben.");
          return;
      }
  
      const fullUrl = `${baseUrl}?sw=${filterWord}`;
      ApiUrl_studienangebote = fullUrl;
      await makeRequest_Studienfach();
  }
  async function makeRequest_Studienfach() {
    try {
      const response = await axios.get(ApiUrl_studienangebote, {
        headers: {
          'X-API-Key': clientCredentials.client_id
        },
      });
      maxPg = Math.floor(response.data.maxErgebnisse/20)

      if (extractedData.length = !0) {
        extractedData = []
      }

      for (let i = 0; i<maxPg; i++) {
        const response2 = await axios.get(ApiUrl_studienangebote, {
          headers: {
            'X-API-Key': clientCredentials.client_id
          },
          params: {
            'pg': i
          }
        });
        extractDataInArray(response2.data.items);
      }

      res.json(extractedData);
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error.message);
    }
  }

function extractDataInArray(items){
  items.forEach(item =>{
    const data = item.studienangebot;
    extractedData.push({data})
  })

  return extractedData;
}


//Hier sind Post und Get Endpunkte für die Filter

app.post("/fetchData", async (req, res) => {
  try {
    makeRequest_Studienfach();
    res.status(200).json({ message: "Daten erfolgreich abgerufen" });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
});



app.get("/search", async (req, res) => {
  const searchWord = req.query.searchWord;
  try {
    await filter_studienangebote(searchWord);

    console.log(`Suche erfolgreich angewendet für: ${searchWord}`);

    res.status(200).json({ message: "Suche erfolgreich angewendet", extractedData: extractedData });
  } catch (error) {
    res.status(400).json({ error: "Fehler beim Anwenden der Suche" });
  }
})

app.get("/extractedData", function (req, res) {
  res.json(extractedData);
});


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
    fs.readFile(filenameFavorites, "utf8", function (err, data) {
      let dataAsObject = JSON.parse(data);
      dataAsObject.push({
          id: dataAsObject.length,
          data: req.body.data
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
