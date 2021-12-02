const axios = require('axios');

exports.homeRoutes = (req, res) => {
  //? MAKE A GET REQUEST TO /API/USERS
  axios
    .get('http://localhost:3000/api/users')
    .then(function (response) {
      res.render('index', { users: response.data });
    })
    .catch(err => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render('add_user');
};

exports.update_user = (req, res) => {
  axios.get("http://localhost:3000/api/users", {params:{id: req.query.id}}) //? edit yapacağımız user'ı çağırıyoruz.
    .then(function(userdata) {
      res.render("update_user", {user : userdata.data})
    })
    .catch(err => {
      res.send(err);
    })
};
