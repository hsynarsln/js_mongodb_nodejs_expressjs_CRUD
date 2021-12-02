const express = require('express');
const dotenv = require('dotenv'); //? config.env dosyasında portu tanımladık buraya import ettik.
const morgan = require('morgan'); //? Morgan , istekleri, hataları ve daha fazlasını konsola kolayca kaydetmemizi sağlayan bir ara yazılımdır.
const bodyparser = require('body-parser');
const path = require('path');

//! MONGODB
const connectDB = require('./server/database/connection');

const app = express();

//! CONNECT CONFIG.ENV
dotenv.config({ path: 'config.env' }); //? bunu yazmadığımız sürece 8080 portuna gidiyor.
const PORT = process.env.PORT || 8080;

//! LOG REQUESTS(MORGAN)
app.use(morgan('tiny')); //GET / 304 - - 7.631 ms

//! MONGODB CONNECTION
connectDB();

//! PARSE REQUESTS TO BODY-PARSER
app.use(bodyparser.urlencoded({ extended: true }));

//!SET VIEW ENGINE
app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, "views/ejs"))

//! LOAD ASSETS
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
//? css/style.css

//! LOAD ROUTERS
app.use('/', require('./server/routes/router'));

//! PORT LİSTEN
app.listen(PORT, () => {
  //? portu dinlemek için yazıyoruz.
  console.log(`Server is running on http://localhost:${PORT}`);
});
