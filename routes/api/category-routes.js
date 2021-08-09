const router = require('express').Router();
const { Category, Product } = require('../../models');

// '/api/categories' endpoint

router.get('/', (req, res) => {
    // find all categories
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    // find one category by id
    Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        ]
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No Category found with this id' });
                return;
            }
            res.json(dbCategoryData);
        })  
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create new category
    Category.create({
       category_name: req.body.category_name 
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    // Update a category by its id
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete a category by its id
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

