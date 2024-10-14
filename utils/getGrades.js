const axios = require('axios');

async function getGrades(name, grade) {
    try {
        const response = await axios.get('http://localhost:4545/grades', {
            params: {
                grade: grade,
                name: name
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return null; // Возвращаем null в случае ошибки
        } else {
            return null; // Возвращаем null в случае ошибки
        }
    }
}

module.exports = { getGrades }