const music_model = require('./music_model')
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose;
db.url = music_model.url;
db.usersRep = require("./mongo.model.js")(mongoose)

module.exports = db
