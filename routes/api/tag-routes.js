const router = require('express').Router();
// { Tag, Product, ProductTag } are destructured from the models/index.js file
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // route to get all tags
  router.get('/', async (req, res) => {
    // try to get all tags
    try {
      // const categoryData is the result of the findAll method on the Tag model, await the promise from Tag.findAll()
      const categoryData = await Tag.findAll({
        // include the Product model here:
        include: [
          {model: Product}
        ],
      });
      // if there are no tags, return a 404 error
      // 200 is the default status code for a successful request
      res.status(200).json(categoryData);
    } catch (err) {
      // 500 is the default status code for an error
      res.status(500).json(err);
    }  
  });

// find a single tag by its `id`
// be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      // find a single tag by its `id` value and  its associated Product data
      // findByPk is a Sequelize method that finds a single primary key based on an id
      const tagData = await Tag.findByPk(req.params.id, {
        include: [
          {model: Product}
        ],
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new tag
  router.post('/', async (req, res) => {
    try {
      // req.body is the data from the front end
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      // if there are no tags, return a 404 error with a message
      if (!tagData[0]) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // delete a tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: { id: req.params.id, }
      });
      if (!tagData) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.status(200).json('Tag has been deleted..!!');
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Export the router
module.exports = router;
