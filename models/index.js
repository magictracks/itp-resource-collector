var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/itp-resource-collector', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

module.exports.User = require("./user");