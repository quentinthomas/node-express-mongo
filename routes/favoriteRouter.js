const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const user = require('../models/user');

const favoriteRouter = express.Router();

module.exports = favoriteRouter;

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({user:req.user._id})
    .populate('favorite.user', 'favorite.campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id});
    if (Favorites.campsites.isArray(campsites)== true) {
        Favorites.campsites.push(req.params.campsites);
    } else {
        Favorite.create(req.body);
        Favorites.campsites.push(req.params.campsiteId);
        Favorite.save(campsites);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({user:req.user._id})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }) 
    res.setHeader('Content-Type', 'text/plain');
    res.end('You do not have any favorites to delete.');
});

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id});
    Favorites.campsites.push(req.params.campsites);
    if (Favorites.campsites.isArray(campsites)== true) {
        res.end('That campsite is already in the list of favorites!')
    } else {
        Favorite.create(req.body);
        Favorites.campsites.push(req.params.campsiteId);
    }

    })
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id});
    Favorites.campsites.filter(req.params.campsiteId);
    Favorite.save(campsites)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    res.setHeader('Content-Type', 'text/plain');
    res.end('You do not have any favorites to delete.');
});