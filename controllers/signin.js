const signinHandler = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Invalid credentials.')
  }
  // console.log(email);
  db.select('email', 'password').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].password);
      if (isValid) {
        db.select('*').from('users')
          .where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Unable to get user.'))
      } else {
        res.json('Wrong credentials.')
      }
    })
    .catch(err => res.json('Wrong credentials.'))
}

module.exports = {
  signinHandler
};
