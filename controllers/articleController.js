const axios = require('axios');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const { BASEURL } = process.env

exports.getArticleDetail = async (req, res, next) => {
  const id = req.query.id;
  if(!id){
    return res.redirect('/home');
  }

  const token = localStorage.getItem('token');
  
  if(!token){
    return res.redirect('/auth/login')
  }
  try {
    const fetchedArticle = await axios.get(`${BASEURL}/articles/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(fetchedArticle.data);
    return res.render('article/articleDetail', { article: fetchedArticle.data.article })
  } catch (err) {
    if(err.response.status === 401){
      return res.redirect('/auth/login')
    }
  }
}