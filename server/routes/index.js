const mapRoutes = require('./map_routes');
module.exports = function(app, db) {
  mapRoutes(app, db);
  // Other route groups could go here, in the future
};
