require('dotenv').config();

const axios = require('axios')
const express = require('express')
const app = express()
const port = process.env.PORT
const apiKey = process.env.RIOT_API_KEY

app.get('summoner/:accountName', (req, res) => {
  
  // Make a request for a user with a given ID
  axios.get(`https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.accountName}?api_key=${apiKey}`)
    .then(function (response) {
      // handle success
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
})
//Binds to default computer port ie. `localhost` or `127.0.0.1` etc
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
