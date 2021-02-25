// Inisialisasi server untuk client disini
const path = require('path');
const express = require('express');
const engine = require('ejs-mate');
const session = require('express-session');

const app = express();
require('dotenv').config(); // Selalu pergunakan enviromental variable (env) untuk informasi yang bersifat sensitif

const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const { errorHandler } = require('./middlewares/errorHandler')

const { PORT, SESSION_SECRET } = process.env

app.use(express.urlencoded({ extended: false })); // Di client kita hanya akan menghandle file x-www-urlencoded dari form

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized:true
}))

app.use(express.static(path.join(__dirname, 'public')))

// Setup ejs dan ejs-mate
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/articles', articleRoutes);

app.use(errorHandler); // Middleware ini khusus handling semua error yang di pass lewat next();

app.listen(PORT || 3000, () => {
  console.log(`Server berjalan di port ${PORT}`);
});