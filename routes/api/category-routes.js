const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // route to get all categories
  router.get('/', async (req, res) => {
    // try to get all categories
    try {
      // const categoryData is the result of the findAll method on the Category model, await the promise from Category.findAll()
      const categoryData = await Category.findAll({
        // include the Product model here:
        include: [
          {model: Product}
        ],
      });
      // if there are no categories, return a 404 error
      // 200 is the default status code for a successful request
      res.status(200).json(categoryData);
    } catch (err) {
      // 500 is the default status code for an error
      res.status(500).json(err);
    }  
  });

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      // find a single category by its `id` value and its associated Products
      // finByPk is a sequelize method that finds a single primary key based on the id
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{
          model: Product
        }],
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });

  // create a new category
  router.post('/', async (req, res) => {
    try {
      // req.body is the data from the front end
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update a category by its `id` value
router.put('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      // if there is no category with that id, return a 404 error with a message
      if (!categoryData[0]) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Tag.destroy({
        where: { id: req.params.id, }
      });
      if (!categoryData) {
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
