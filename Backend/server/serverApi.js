const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 2000;

app.use(cors());

function log(req, res, next) {
    console.log(req.method + " Request at" + req.url);
    next();
}
app.use(log);


app.use(async function (req, res, next) {
  try {
      const token = await getToken();
      req.token = token;
      next();
  } catch (error) {
      throw new Error('Fehler beim Abrufen des Tokens');
  }  
});


async function getToken() {
  try {
      const response = await axios.post('https://rest.arbeitsagentur.de/oauth/gettoken_cc', {
          client_id: '5aee2cfe-1709-48a9-951d-eb48f8f73a74',
          client_secret: '3309a57a-9214-40db-9abe-28b1bb30c08c',
          grant_type: 'client_credentials'
      });

      if (response.data && response.data.access_token) {
          return response.data.access_token;
      } else {
          throw new Error('Token nicht erhalten');
      }
  } catch (error) {
      throw new Error('Fehler bei der Token-Erstellung');
  }
}



async function getDataFromToken(token) {
  try {
    const headers = {
      'OAuthAccessToken': token
    };

    const response = await axios.get('https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote', {
      headers: headers
    });

    return response.data;
  } catch (error) {
    throw new Error(`Fehler bei der API-Anfrage: ${error.message}`);
  }
}


app.get('/getToken', async (req, res) => {
  try {
    const token = await getToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/getData', async function (req, res) {
  try {
      const response = await getData(req.token);
      res.json(response.data);
  } catch (error) {
      throw new Error('Fehler beim Abrufen der Daten' );
  }
});




async function getData(token) {
  try {
      const headers = {
          'OAuthAccessToken': token
      };

      const response = await axios.get('https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote', {
          headers: headers
      });

      return response;
  } catch (error) {
      throw new Error(`Fehler bei der API-Anfrage: ${error.message}`);
  }
}


app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
