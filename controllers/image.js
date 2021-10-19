const Clarifai = require ('clarifai');

const app = new Clarifai.App({
  apiKey: 'e25daf73f1d5465db82edf652ef68196'
});

const apiCallHandler = () => (req, res) => {
  app.models.predict("e15d0f873e66047e579f90cf82c9882z", req.body.input)
    .then(data => res.json(data))
    .catch(err => console.log(err))
};

const imageHandler = db => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(err => res.status(400).json('Unable to get entries'))
};

module.exports = {
  imageHandler,
  apiCallHandler
}
