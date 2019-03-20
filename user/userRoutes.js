const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');

router.use(express.json());

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  db.insert(req.body)
    .then(insertedPost => {
      res.status(201).json({ 'Post Created': insertedPost });
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json({ 'Here are your posts': posts });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removePost => {
      if (removePost) {
        res.status(200).json(removePost);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (title && contents) {
    db.update(id, { title, contents })
      .then(count => {
        if (count) {
          db.findById(id).then(updatedPost => {
            res.status(200).json(updatedPost);
          });
        } else {
          res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The post information could not be modified.' });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
});

module.exports = router;
