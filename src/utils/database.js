const mongoose = require('mongoose');
const Settings = require('./settings');

//connects with the database
exports.connectDatabase = async () => {
    let URI = Settings.getDB_URI();
    return mongoose.connect(URI, { useNewUrlParser: true });
}
