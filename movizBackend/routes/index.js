var express = require('express');
var router = express.Router();
var request = require('sync-request');

var movieModel = require('../models/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {

    var data = request('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=b05af5f22381af94cf243098319419bc&language=fr&region=FR&sort_by=popularity.desc&page=1')
    var response = JSON.parse(data.body);
    // console.log(response.results);
    
    res.json({result: response.results});
});

router.post('/wishlist-movie', async function(req, res, next) {

    var newMovie = new movieModel({
        name: req.body.name,
        img: req.body.img
    }) 

    var movie = await newMovie.save()

    console.log(movie);

    var result = false
    if(movie.name){
        result = true
    }

    res.json({result});
});

router.delete('/wishlist-movie/:name', async function(req, res, next) {

    var deleteMovie = await movieModel.deleteOne({name: req.params.name})

    var result = false;
    if(deleteMovie.deletedCount == 1){
        result = true;
    }

    res.json({result});
});

router.get('/wishlist-movie', async function(req, res, next) {

    var movies = await movieModel.find()

    res.json({movies});
});

module.exports = router;
