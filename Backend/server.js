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
  
  //API Anfrage für Studienfelder
  const apiUrl = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfelder';
  
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
  const apiUrlNext = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?sw=Informatikberufe';
  
  async function makeRequest_Suchwort() {
    try {
      const response = await axios.get(apiUrlNext, {
        headers: {
          'X-API-Key': clientCredentials.client_id
        }
      });
      // Ausgabe der API-Antwort
      console.log(response.data);
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error.message);
      throw new Error('Fehler bei Token-Erstellimg 02', error.message);
    }
  }
  
  // Ausführung der Anfrage
  makeRequest_Suchwort();
  makeRequest();





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