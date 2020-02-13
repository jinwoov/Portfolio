'use strict';

function notFoundHandler(request, response) {
  response.status(404).send('Sorry, something went wrong');
}

function errorHandler (error, request, response) {
  response.status(500).send(error.message);
}

module.exports = {
  notFoundHandler,
  errorHandler
}
