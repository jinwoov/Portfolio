'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('ejs');
require('cors')
const PORT = process.env.PORT || 3001
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const nodemailer = require('nodemailer');
const methodOverride = require('method-override');

//EMAIL FORM
let username = process.env.USERNAME;
let send = process.env.SENDGRID_API_KEY;


///// helper ///
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


app.get('/', indexPage);
app.post('/contact', contactMe);
/////// backside
app.get('/login', adminPage);
app.post('/admin', adminLogin);
app.post('/admin/insert', insertData);
////////update/delete
app.put('/update/:id', updateProject);
app.delete('/delete/:id', deleteProject)


function indexPage(request, response) {
  let PSQL = 'SELECT * FROM user_storage;';
  client.query(PSQL)
    .then(result => {
      result.rows.sort((a, b) => {
        return a.id < b.id ? -1 : 1;
      })
      response.status(200).render('./index', {
        thankYou: false,
        data: result.rows});
    })
}

function adminPage(request, response) {
  response.status(200).render('./pages/login');
}

function adminLogin(request, response) {
  let {username, password} = request.body;

  let SQL = 'SELECT * FROM users WHERE username = $1 AND password = crypt($2, password);';
  let safeValue = [username, password];
  client.query(SQL, safeValue)
    .then(result => {
      if (result.rowCount === 1) {
        let SQL1 = `SELECT * FROM user_storage`;
        client.query(SQL1)
          .then(data=> {
            response.status(200).render('./pages/admin',{result: data.rows})
          });
      }
      else {
        response.redirect('/')
      }
    })
}

function contactMe(request,response) {
  let {name, email, message} = request.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'apikey',
      pass: send
    }
  });
  const mailOpts = {
    from: email,
    to: username,
    subject: `${name} from My Portfolio `,
    text: message
  }
  transporter.sendMail(mailOpts)
  let PSQL = 'SELECT * FROM user_storage;';
  client.query(PSQL)
    .then(result => {
      response.status(200).render('./index', {
        thankYou: true,
        data: result.rows});
    }).catch (err => console.error(err))
}


function insertData(request, response) {
  let {title, summary, url, image_url} = request.body
  let SQL2 = `INSERT INTO user_storage (title,summary,url,image_url) VALUES ($1, $2, $3, $4)`;
  let safeValue = [title,summary,url,image_url];
  client.query(SQL2, safeValue)
  let SQL10 = `SELECT * FROM user_storage`;
  client.query(SQL10)
    .then(data=> {
      console.log(data.rows)
      response.status(200).render('./pages/admin',{result: data.rows})
    });
}

function updateProject(request, response) {
  let value = request.params.id;
  let { title, summary, url, image_url } = request.body;
  console.log(value)
  let SQL = `UPDATE user_storage SET title=$1, summary=$2, url=$3, image_url=$4 WHERE id=$5;`;
  let safeValue = [title, summary, url, image_url, value];
  client.query(SQL, safeValue)
    .then(response.redirect('/login'));
}

function deleteProject(request, response) {
  let SQL = 'DELETE FROM user_storage where id=$1;';
  let values = [request.params.id];
  client.query(SQL,values)
    .then(response.redirect('/login'))
}



///Error handler////
app.get('*', notFoundHandler)
function notFoundHandler(request, response) {
  response.status(404).send('Sorry, something went wrong');
}


client.connect()
  .then(
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
  )
  .catch(err => console.error(err))
