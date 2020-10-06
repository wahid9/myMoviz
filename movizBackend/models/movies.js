var mongoose = require('./connection');

var movieSchema = mongoose.Schema({
    name: String,
    img: String
});

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;