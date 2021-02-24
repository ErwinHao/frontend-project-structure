const axios = require('axios');
const { BASEURL } = process.env
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch')

// Ini adalah controller untuk handle render view login dan buat request ke backend

exports.getLoginView = (req, res, next) => {
  // console.log(localStorage.getItem('token'));
  return res.render('auth/login')
}

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const loadedUser = await axios.post(`${BASEURL}/auth/login`, {
      username,password
    });
    req.session.user = loadedUser.data.username;
    
    localStorage.setItem('token', loadedUser.data.token);
    return res.redirect('/home')
  } catch (err) {
    console.log(err);
  }
  
}