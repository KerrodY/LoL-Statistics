require('dotenv').config();

const cors = require('cors');
const axios = require('axios')
const express = require('express')
const app = express()

//TODO: this allows anyone to make request, not secure but probably okay for an API. Needs more thought.
app.use(cors())

const port = process.env.PORT
const apiKey = process.env.RIOT_API_KEY

app.get('/:region/summoner/:accountName', (req, res) => {
  // get summoner data for given summoner
  axios.get(`https://${req.params.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.accountName}?api_key=${apiKey}`)
    .then(function (response) {
      // get match ids for given summoner
      axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${response.data.puuid}/ids?start=0&count=20&api_key=${apiKey}`)
        .then(function (response2) {
          response2.data.map(id => 
            //get match data for given ids
            axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${apiKey}`)
            .then(function (resp) {
              console.log(resp.data.metadata.matchId)
            })
            .catch(function (error) {console.log(error); })
            .then(function () { })
          )

          data = response.data
          data.gameIds = response2.data
          res.send(data)
        })
        .catch(function (error) {console.log(error); })
        .then(function () { });
      })
    .catch(function (error) { console.log(error); })
    .then(function () { });
})
//Binds to default computer port ie. `localhost` or `127.0.0.1` etc
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
