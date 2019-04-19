const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

var d = new Date();
console.log("Connection start at " + d.toTimeString().split(' ')[0].split(';'));

// Fantasy football API URL
const URL = 'https://fantasy.premierleague.com/drf/elements/'

app.get('/', (req, res) => {
	axios.get(URL).then((response) => {
        response.data.value
       	res.send({
        	message: 'FF API information successful',
        	status: true,
        	contents: response.data
      	})
    }, (error) => {
        console.log('error:' + error)
    })
})

app.listen(process.env.PORT || 8081)