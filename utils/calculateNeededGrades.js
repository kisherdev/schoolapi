function calculateNeededGrades(grades, decimalPlaces) {
    // Фильтруем оценки 3, 4 и 5
    let filteredGrades = grades.filter(val => val >= 2 && val <= 5);

    // Считаем количество оценок каждого типа
    let grade5 = filteredGrades.filter(val => val === 5).length;
    let grade4 = filteredGrades.filter(val => val === 4).length;
    let grade3 = filteredGrades.filter(val => val === 3).length;
    let grade2 = filteredGrades.filter(val => val === 2).length;

    let totalGrades = filteredGrades.length;

    // Инициализация переменных для подсчета
    let need5to4 = 0;
    let need4to4 = 0;
    let need5to5 = 0;

    // Сколько нужно 5 для достижения среднего балла 4
    let totalGradesTo4With5 = totalGrades + need5to4;
    let averageTo4With5 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need5to4 * 5) / totalGradesTo4With5).toFixed(decimalPlaces);

    while (averageTo4With5 < 3.5 || averageTo4With5 === 3.5) {
        need5to4++;
        totalGradesTo4With5 = totalGrades + need5to4;
        averageTo4With5 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need5to4 * 5) / totalGradesTo4With5).toFixed(decimalPlaces);
    }

    // Сколько нужно 4 для достижения среднего балла 4
    let totalGradesTo4With4 = totalGrades + need4to4;
    let averageTo4With4 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need4to4 * 4) / totalGradesTo4With4).toFixed(decimalPlaces);

    while (averageTo4With4 < 3.5 || averageTo4With4 === 3.5) {
        need4to4++;
        totalGradesTo4With4 = totalGrades + need4to4;
        averageTo4With4 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need4to4 * 4) / totalGradesTo4With4).toFixed(decimalPlaces);
    }

    // Сколько нужно 5 для достижения среднего балла 5
    let totalGradesTo5With5 = totalGrades + need5to5;
    let averageTo5With5 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need5to5 * 5) / totalGradesTo5With5).toFixed(decimalPlaces);

    while (averageTo5With5 < 4.5 || averageTo5With5 === 4.5) {
        need5to5++;
        totalGradesTo5With5 = totalGrades + need5to5;
        averageTo5With5 = ((grade5 * 5 + grade4 * 4 + grade3 * 3 + grade2 * 2 + need5to5 * 5) / totalGradesTo5With5).toFixed(decimalPlaces);
    }

    // Результаты
    return {
        need5to4: need5to4,
        need4to4: need4to4,
        need5to5: need5to5,
        averageTo4With4: averageTo4With4,
        averageTo4With5: averageTo4With5,
        averageTo5With5: averageTo5With5
    };
}

module.exports = { calculateNeededGrades }