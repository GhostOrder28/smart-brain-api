const registerHandler = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('Invalid data.')
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      email: email,
      password: hash
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      trx.insert({
        name: name,
        email: loginEmail[0],
        joined: new Date()
      })
      .into('users')
      .returning('*')
      .then(user => {
        res.json(user[0])
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
};

module.exports = {
  registerHandler
}
