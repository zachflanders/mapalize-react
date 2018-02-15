const express = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  const mapalizeReact = database.db('mapalize-react')
  require('./server/routes')(app, mapalizeReact);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
