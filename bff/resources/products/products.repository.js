const axios = require('axios');
const https = require('https');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


const getProducts = async ({categoryId, offset, limit}) => {
    try {
        const categoryFilters = `categoryId=1&searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&searchCriteria[filterGroups][0][filters][0][condition_type]=eq`;
        const pageFilters = `searchCriteria[currentPage]=${offset}`;
        const  pageSizeFilters = `searchCriteria[pageSize]=${limit}`;
        const url = `https://magento.test/rest/default/V1/products? + ${[ pageFilters,pageSizeFilters, categoryFilters].join('&')}`;
        const response = await instance.get(url);
        return response.data;  //<= Ось тут !
    } catch (err) {
        console.log(err)
        return (err)
    }
}

module.exports = {getProducts};
