const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 8080;
const filename = __dirname + "/weight.json";
const filename2 = __dirname + "/data.json";

const axios = require('axios');

// Client Credentials
const client_id = '5aee2cfe-1709-48a9-951d-eb48f8f73a74';
const client_secret = '3309a57a-9214-40db-9abe-28b1bb30c08c';



//Middleware
app.use(express.json()); //for parsing application/json
app.use(cors()); //for configuring Cross-Origin Resource Sharing (CORS)
function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);


// Funktion zum Abrufen des Tokens
//client_id und client_secret Konstanten werden an post übergeben, hier liegt schon der Fehler. Auch wenn Konstanten 
//direkt in den Post geschrieben werden besteht der Fehler:
//Fehler bei der Token-Erstellung: AxiosError {message: 'Request failed with status code 500', name: 'AxiosError' 
async function getToken() {
    try {
      const response = await axios.post('https://rest.arbeitsagentur.de/oauth/gettoken_cc', {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials'
      });
  
      if (response.data && response.data.access_token) {
        return response.data.access_token;
      } else {
        throw new Error('Token nicht erhalten');
      }
    } catch (error) {
      throw new Error(`Fehler bei der Token-Erstellung: ${error.message}`);
    }
  }

  //Abrufen der Daten
  //Der "erhaltene Token" wird hier an den "get" weitergegeben und soll auf die Daten zugreifen 
async function getDataFromToken() {
    try {
      const token = await getToken();
  
      const headers = {
        'OAuthAccessToken': token
      };
  
      const response = await axios.get('https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote', {
        headers: headers
      });
  
      console.log('API-Antwort:', response.data);
    } catch (error) {
      console.error('Fehler bei der API-Anfrage:', error.message);
    }
  }
  
  getDataFromToken();

  


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