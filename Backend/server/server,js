const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Client Credentials
const client_id = '5aee2cfe-1709-48a9-951d-eb48f8f73a74';
const client_secret = '3309a57a-9214-40db-9abe-28b1bb30c08c';

// Funktion zum Token-Abrufen
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
        console.error('Ungültige Antwort vom Token-Endpunkt:', response.data);
        throw new Error('Token nicht erhalten');
      }
    } catch (error) {
      console.error('Fehler bei der Token-Erstellung:', error.message);
      throw new Error('Fehler bei der Token-Erstellung');
    }
  }

// Funktion zum Abrufen von Daten mit Token
async function getDataFromToken(token) {
  try {
    const headers = {
      'OAuthAccessToken': token
      // Alternativ: 'X-API-Key': client_id
    };

    const response = await axios.get('https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote', {
      headers: headers
    });

    return response.data;
  } catch (error) {
    throw new Error(`Fehler bei der API-Anfrage: ${error.message}`);
  }
}

// Routen für Token und Daten
app.get('/getToken', async (req, res) => {
  try {
    const token = await getToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/getData', async (req, res) => {
  try {
    const token = await getToken();
    const data = await getDataFromToken(token);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
