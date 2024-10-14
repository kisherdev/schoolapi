const axios = require('axios');

async function getClasses() {
    try {
        const response = await axios.get('http://localhost:4545/classes');
        return response.data.available_classes;
    } catch (error) {
        if (error.response) {
            return null; // Возвращаем null в случае ошибки
        } else {
            return null; // Возвращаем null в случае ошибки
        }
    }
}

module.exports = { getClasses }