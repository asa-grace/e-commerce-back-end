const router = require('express').Router();
const { Category, Product } = require('../../models');

// '/api/categories' endpoint

router.get('/', (req, res) => {
    Category.findAll()
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})