const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const app = express();
var cache = [];
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.use(morgan("dev"));



app.get("/", function(req, res){
    let id = req.query;
    let key = Object.keys(id)[0];
    let value = id[key];

    if (cache.hasOwnProperty(value)){
        res.json(cache[value])
    }   else {
        axios.get("http://www.omdbapi.com/?apikey=8730e0e&" + key + "=" + encodeURI(value))
        .then(function(response){
            res.json(response.data);
            cache[value] = response.data;
        })
        .catch(function(error){
            console.log(error);
        })
    }
})



/*
app.get("/", function(req, res){
    let i = req.query.i;
    let t = req.query.t;

    if (i){
        axios.get("http://www.omdbapi.com/?apikey=8730e0e&i=" + i)
        .then(function(response){
            axios.post(response)
        })
        .catch(function(error){
            console.log(error);
        })
    } else if (t) {
        axios.get("http://www.omdbapi.com/?apikey=8730e0e&t=" + t)
        .then(function(response){
            console.log("t");
        })
    } else {
        res.send("Please use an i or t query")
    }
});

*/

//find out if whoever made a request to your server used and i or t query 

// if not just respond with a message that says please use an i or t query

// if so make an axios (ajax) call to the movie finder api and respond with the movie object
// which you grab based on the i or t query


module.exports = app;