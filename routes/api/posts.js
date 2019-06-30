//TWO
const express = require('express'),
  mongodb = require('mongodb'),
  router = express.Router();

//Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//Add posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Delete posts
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(`mongodb+srv://Eldredge:5n@k3t1t5@cluster0-mjcq7.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
  });

  return client.db('Cluster0').collection('posts');
};

module.exports = router;