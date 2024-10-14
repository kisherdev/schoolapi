const { getSchedule } = require('../utils/getSchedule.js')

async function selectDate(bot, callbackQuery) {
    const className = callbackQuery.data.split('_')[1]
    const date = callbackQuery.data.split('_')[2]

    const schedule = await getSchedule(className, date.replace(/\./g, '-'))
    const formattedSchedule = schedule.schedule.map((subject, index) => `${index + 1}. ${subject}`).join('\n');

    const currentYear = new Date().getFullYear();
    const formattedDate = date.split('.').reverse().join('-');
    const date1 = new Date(`${currentYear}-${formattedDate}`);
    const year = date1.getFullYear();

    text = `📅 ${date.replace(/-/g, '.')}.${year} | ${schedule.day_of_week}\n📌 Класс: \`${schedule.class}\`\n\n${formattedSchedule || 'Расписание отсутствует.'}`
    await bot.editMessageText(text, {
        message_id: callbackQuery.message.message_id,
        chat_id: callbackQuery.message.chat.id,
        parse_mode: 'Markdown', 
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ 
                    text: '⬅️ Назад',
                    callback_data: `back_seldate_${className}`
                }]
            ]
        })
    })
}

module.exports = { selectDate }