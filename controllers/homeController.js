const axios = require('axios');
const { BASEURL } = process.env
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

exports.getHomeView = async (req, res, next) => {
  // Selalu gunakan trycatch untuk axios atau fetch request
  const token = localStorage.getItem('token');
  if(!token){
    return res.redirect('/login');
  }
  try {
    const fetchedData = await axios.get(`${BASEURL}/articles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    return res.render('home/home', { articles: fetchedData.data.articles });
  } catch (err) {
    console.log(err.response.status);
    if(err.response.status === 401){
      return res.redirect('/auth/login')
    }
  }
} 