
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
  



  let ApiUrl_studienangebote = ""; 

  function filter_studienangebote(filterWord) {

      const baseUrl = "https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote";
  
 
      if (!filterWord) {
          console.error("Filterwort fehlt. Bitte ein gültiges Filterwort angeben.");
          return;
      }
  
 
      const fullUrl = `${baseUrl}?sw=${filterWord}`;
  
   
      ApiUrl_studienangebote = fullUrl;
  
  
      console.log("Filter angewendet. Vollständige URL:", ApiUrl_studienangebote);
  

  }
  
// Aufrufe um ein Wort zu filtern
  const filterWord = "Informatik";
  filter_studienangebote(filterWord);
  

  console.log("Neue API-URL:", ApiUrl_studienangebote);

async function makeRequestSuchwort() {
  try {
    const response = await axios.get(ApiUrl_studienangebote, {
      headers: {
        'X-API-Key': clientCredentials.client_id,
      },

    });
    console.log(response.data);
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error.message);
    throw new Error('Fehler bei Token-Erstellimg 02', error.message);
  }
}
makeRequestSuchwort();


 /* async function makeRequest_StudienFilter(filterString) {
    try {
      const response = await axios.get(apiUrl_StudienFilter, {
        headers: {
          'X-API-Key': clientCredentials.client_id,
        },
        params: {
          sw: filterString, // Hier wird der Filterstring als Parameter eingefügt
        },
      });
  
      console.log(`Studiengänge mit Filter "${filterString}":`);
  
      const studienangebote = response.data.studienangebote;
  
      for (const studiengang of studienangebote) {
        console.log(`- Studiengang ${studiengang.key}: ${studiengang.name}`);
        console.log(`  DkzId: ${studiengang.dkzId}`);
        console.log(`  Studienform: ${studiengang.studienform}`);
        console.log(`  Studientyp: ${studiengang.studientyp}`);
        console.log(`  Studiengangmodell: ${studiengang.studiengangmodell}`);
        console.log(`  Abschlussgrad: ${studiengang.abschlussgrad}`);
        console.log(`  Hochschulart: ${studiengang.hochschulart}`);
      }
    } catch (error) {
      console.error('Fehler bei der Anfrage für Studienangebote:', error.message);
    }
  }
  */
  // Beispielaufruf für Studienangebote mit einem bestimmten Filter

 async function makeRequest_StudienFilter() {

    try {
      const response = await axios.get(apiUrl_StudienFilter, {
        headers: {
          'X-API-Key': clientCredentials.client_id
        },
      });
  
      // Funktionen aufrufen, um spezifische Parameter mit Studiengang auszugeben
      return {
        bundeslaender: extractBundesland(response.data.items),
        abschlussgrade: extractAbschlussgrad(response.data.items),
        studienformen: extractStudienform(response.data.items),
        studientypen: extractStudientyp(response.data.items),
        studiengangmodelle: extractStudiengangmodell(response.data.items),
        hochschularten: extractHochschulart(response.data.items),
      };
      
  
    } catch (error) {
      console.error('Fehler bei der Anfrage:', error.message);
    }
  }
  makeRequest_StudienFilter('Informatik');
 /* // Now you can use the extracted data outside the function
async function processStudienFilterData() {
  try {
    const filterData = await makeRequest_StudienFilter();
    
    // Access the data like this
    const filterParams = {
      bundeslaender: filterData.bundeslaender,
      abschlussgrade: filterData.abschlussgrade,
      studienformen: filterData.studienformen,
      studientypen: filterData.studientypen,
      studiengangmodelle: filterData.studiengangmodelle,
      hochschularten: filterData.hochschularten,
    };
    console.log('Bundesländer:', filterParams.bundeslaender);
    console.log('Abschlussgrade:', filterParams.abschlussgrade);
    console.log('Studienformen:', filterParams.studienformen);
    console.log('Studientypen:', filterParams.studientypen);
    console.log('Studiengangmodelle:', filterParams.studiengangmodelle);
    console.log('Hochschularten:', filterParams.hochschularten);
  } catch (error) {
    // Handle errors here
    console.error('Error processing filter data:', error.message);
  }
}
  
 
  function extractBundesland(items) {
    return items.map(item => item.studienangebot.region.label);
  }
  
  
  function extractAbschlussgrad(items) {
    return items.map(item => item.studienangebot.abschlussgrad.label);
  }
  
  
  function extractStudienform(items) {
    return items.map(item => item.studienangebot.studienform.label);
  }
  
  
  function extractStudientyp(items) {
    return items.map(item => item.studienangebot.studientyp.label);
  }
  
  
  function extractStudiengangmodell(items) {
    return items.map(item => item.studienangebot.studiengangmodel.label);
  }
  
  
  function extractHochschulart(items) {
    return items.map(item => item.studienangebot.hochschulart.label);
  }
  
  processStudienFilterData();

*/


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
