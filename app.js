const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Binds to default computer port ie. `localhost` or `127.0.0.1` etc
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})