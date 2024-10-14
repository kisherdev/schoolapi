function getWeekDays() {
    const days = [];
    const today = new Date();
    let currentDay = today.getDay(); 

    if (currentDay === 0) {
        today.setDate(today.getDate() + 1); 
        currentDay = 1; 
    }

    const monday = today.getDate() - (currentDay - 1);

    for (let i = 0; i < 6; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), monday + i);
        const day = date.toLocaleDateString('ru-RU', { weekday: 'long' });
        const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        days.push({ date: formattedDate, day });
    }

    return days;
}

module.exports = { getWeekDays };
