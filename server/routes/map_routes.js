var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/api/maps', (req, res) => {
    const map = {
      name: req.body.name,
      center: req.body.center,
      zoom: req.body.zoom,
      features: req.body.features
    };
    db.collection('maps').insert(map, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.get('/api/map/:id', (req, res) => {
    console.log('get');
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('maps').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

};
