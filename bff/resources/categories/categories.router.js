const express = require('express');
const router = express.Router();
const categoriesService = require('./categories.service');

router.get('/', async function (req, res) {
    const data = await categoriesService.getCategories();

    res.send(data)
})

module.exports = router;
