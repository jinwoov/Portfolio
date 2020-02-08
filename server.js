'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('ejs');
const PORT = process.env.PORT || 3001

///// helper ///
app.use(express.static('./public'));
app.set('view engine', 'ejs');


app.get('/', indexPage)
function indexPage(request, response) {
  response.status(200).render('./index')
}



///Error handler////
app.get('*', notFoundHandler)
function notFoundHandler(request, response) {
  response.status(404).send('Sorry, something went wrong');
}

app.listen(PORT, () => console.log(`You are listening to ${PORT}`))

