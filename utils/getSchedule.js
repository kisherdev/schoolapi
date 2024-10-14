const axios = require('axios');

async function getSchedule(className, date) {
    try {
        const response = await axios.get('http://localhost:4545/schedule', {
            params: {
                class: className,
                date: date
            }
        })
        return response.data;
    } catch(error) {
        if (error.response) {
            return null; // Возвращаем null в случае ошибки
        } else {
            return null; // Возвращаем null в случае ошибки
        }
    }
}

module.exports = { getSchedule }