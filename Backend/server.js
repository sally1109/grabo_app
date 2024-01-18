
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
  
  //Diese Funktion filtert nach allen geforderten Parametern (bundesländer, abschlussgrade...) und speichert die angaben in Variablen (die noch dem Frontend übergeben werden müssen)
  const apiUrl_StudienFilter = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?sw=Kunst';



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
  // Now you can use the extracted data outside the function
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


//Diese Funktion gibt alle geforderten Parameter aus der Datenbank in der Konsole aus
const apiUrl_Studienfach = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfelder';
async function makeRequest_Studienfach() {
  try {
    const response = await axios.get(apiUrl_Studienfach, {
      headers: {
        'X-API-Key': clientCredentials.client_id
      },
    });
    
    console.log(response.data);
    en
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
    console.log(`Bundesland: ${bundesland}, Studiengang: ${studiengang}`);
  });
}

function extractAbschlussgrad(items) {
  items.forEach(item => {
    const abschlussgrad = item.studienangebot.abschlussgrad.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    console.log(`Studiengangsabschlussgrad: ${abschlussgrad}, Studiengang: ${studiengang}`);
  });
}

function extractStudienform(items) {
  items.forEach(item => {
    const studienform = item.studienangebot.studienform.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    console.log(`Studienform: ${studienform}, Studiengang: ${studiengang}`);
  });
}

function extractStudientyp(items) {
  items.forEach(item => {
    const studientyp = item.studienangebot.studientyp.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    console.log(`Studientyp: ${studientyp}, Studiengang: ${studiengang}`);
  });
}

function extractStudiengangmodell(items) {
  items.forEach(item => {
    const studiengangmodel = item.studienangebot.studiengangmodel.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    console.log(`Studiengangmodel: ${studiengangmodel}, Studiengang: ${studiengang}`);
  });
}

function extractHochschulart(items) {
  items.forEach(item => {
    const hochschulart = item.studienangebot.hochschulart.label;
    const studiengang = item.studienangebot.studiBezeichnung;
    console.log(`Hochschulart: ${hochschulart}, Studiengang: ${studiengang}`);
  });
}
    
    
  // -------------Anfragen-------------





  //Diese Funktion gibt alle Studienfeldgruppen und DkzIds aus
//Diese Funktion dient nur als Information für die Studienfeldgruppen und ist für die Filterfunktionen unnötig
const apiUrl_Studienfeldgruppen = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfelder';
async function makeRequest_Studienfeldgruppen() {
  try {
    const response = await axios.get(apiUrl_Studienfeldgruppen, {
      headers: {
        'X-API-Key': clientCredentials.client_id,
      },
    });
    console.log(response.data);
    const studienfeldgruppen = response.data.studienfeldgruppen;
    for (const studienfeldgruppe of studienfeldgruppen) {
      const { key, name, dkzIds, studienfelder } = studienfeldgruppe;
      console.log(`Studienfeldgruppe ${key}: ${name}`);
      console.log(`DkzIds: ${dkzIds}`);
      
      for (const studienfeld of studienfelder) {
        const { key, name, dkzIds } = studienfeld;
        console.log(`- Studienfeld ${key}: ${name}`);
        console.log(`  DkzIds: ${dkzIds}`);
      }
    }
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error.message);
  }
}



/*const apiUrl_Studienfeldgruppen = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfelder';
const apiUrl_Studienganginformationen = 'https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienfeldinformationen';

async function makeRequest_Studienfeldgruppen(umkreis, bundesland, studienform, studientyp, studiengangmodell, abschlussgrad, hochschulart) {
  try {
    const response = await axios.get(apiUrl_Studienfeldgruppen, {
      headers: {
        'X-API-Key': clientCredentials.client_id,
      },
      params: {
        uk: umkreis, // Umkreis in km
        re: bundesland, // Bundesland
        sfo: studienform, // Studienform
        st: studientyp, // Studientyp
        smo: studiengangmodell, // Studiengangmodell
        abg: abschlussgrad, // Studiengangsabschlussgrad
        hsa: hochschulart, // Hochschulart
      },
    });

    console.log(`Studiengänge in ${bundesland} im Umkreis von ${umkreis} km:`);

    const studienfeldgruppen = response.data.studienfeldgruppen;
      // Prüfen, ob dkzIds ein String ist
      if (typeof dkzIds === 'string') {
        const dkzArray = dkzIds.split(';');

        for (const dkzId of dkzArray) {
          const studiengangInfoResponse = await axios.get(`${apiUrl_Studienganginformationen}?dkz=${dkzId}`, {
            headers: {
              'X-API-Key': clientCredentials.client_id,
            },
          });

        const studiengangInfo = studiengangInfoResponse.data;
        console.log(`- Studiengang ${studiengangInfo.key}: ${studiengangInfo.name}`);
        console.log(`  DkzId: ${studiengangInfo.dkzId}`);
        console.log(`  Studienform: ${studiengangInfo.studienform}`);
        console.log(`  Studientyp: ${studiengangInfo.studientyp}`);
        console.log(`  Studiengangmodell: ${studiengangInfo.studiengangmodell}`);
        console.log(`  Abschlussgrad: ${studiengangInfo.abschlussgrad}`);
        console.log(`  Hochschulart: ${studiengangInfo.hochschulart}`);
      }
    }
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error.message);
  }
}

// Beispielaufruf für Studiengänge in Bayern im Umkreis von 50 km mit zusätzlichen Parametern
makeRequest_Studienfeldgruppen(50, 'BY', '1;2', '1', '1;2', '10', '101;106');*/


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
