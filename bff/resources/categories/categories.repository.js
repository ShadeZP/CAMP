const axios = require('axios');
const https = require('https');

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});


const getCategories = async () => {
    try {
        const response = await instance.get('https://magento.test/rest/default/V1/categories');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {getCategories};
