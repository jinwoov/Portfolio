'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('ejs');
require('cors');
const PORT = process.env.PORT || 3001
const methodOverride = require('method-override');
const defaults = require('./lib/middleware.js');
const routes = require('./lib/routes.js')
const client = require('./lib/client.js')




///// helper ///
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', routes.indexPage);
app.post('/contact', routes.contactMe);

/////// backside
app.get('/login', routes.adminPage);
app.post('/admin', routes.adminLogin);
app.post('/admin/insert', routes.insertData);

////////update/delete
app.put('/update/:id', routes.updateProject);
app.delete('/delete/:id', routes.deleteProject)


///Error handler////
app.get('*', defaults.notFoundHandler)
app.use(defaults.errorHandler);



client.connect()
  .then(
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
  )
  .catch(err => console.error(err))


