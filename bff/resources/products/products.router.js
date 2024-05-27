const express = require('express');
const router = express.Router();
const productsService = require('./products.service');

router.get('/', async function (req, res) {
    const {categoryId, offset, limit} = req.query;
    const data = await productsService.getProducts({categoryId, offset, limit});
    // console.log('data', data)
    res.send(data)
})

module.exports = router;


