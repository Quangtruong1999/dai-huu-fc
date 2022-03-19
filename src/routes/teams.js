const express = require('express')
const router = express.Router()
const team_controller = require('../app/controllers/TeamController')
var axios = require('axios');

var request = require("request");

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/teams',
  qs: {country: 'Vietnam'},
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '8c917127dbeaff2e76525aec279df071'
  }
};

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });


router.use('/', team_controller.index)

module.exports = router