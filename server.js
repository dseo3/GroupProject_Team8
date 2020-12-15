// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    const data = await fetch('https://api.umd.io/v1/courses');
    const data_isa = await fetch("https://api.umd.io/v1/courses/list?semester=202008");
    const json = await data.json();
    const json_isa = await data_isa.json();
    res.json(json);
    res.json(json_isa);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
