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
                attributes: ['id', 'price', 'stock']
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
                attributes: ['id', 'price', 'stock']
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
});

router.put('/:id', (req, res) => {
    // Update a category by its id
});

router.delete('/:id', (req, res) => {
    // delete a category by its id
});

module.exports = router;

