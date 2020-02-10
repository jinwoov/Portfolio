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

//EMAIL FORM
let username = process.env.USERNAME;
let pass = process.env.PASS;

///// helper ///
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', indexPage);
app.post('/contact', contactMe);
/////// backside
app.get('/login', adminPage);
app.post('/admin', adminLogin);
app.post('/admin/insert', insertData)


function indexPage(request, response) {
  response.status(200).render('./index', {thankYou: false});
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
            console.log(data)
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
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: username,
      pass: pass
    }
  });
  const mailOpts = {
    from: email,
    to: username,
    subject: `${name} from My Portfolio `,
    text: `${message} EMAIL IS ${email}`
  }
  transporter.sendMail(mailOpts)
    .then(result => {
      if (result.accepted.length > 0) {
        response.status(200).render('./index', {thankYou: true});
      } else {
        response.status(200).render('./index', {thankYou: false});
      }
    }) .catch (err => console.error(err))
}


function insertData(request, response) {
  let {title, summary, url} = request.body
  let SQL2 = `INSERT INTO user_storage (title,summary,url) VALUES ($1, $2, $3)`;
  let safeValue = [title,summary,url];
  client.query(SQL2, safeValue)
    .then(result => {
      response.status(200).redirect('/')
    })
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
