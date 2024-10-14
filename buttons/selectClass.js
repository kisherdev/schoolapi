const { getWeekDays } = require('../utils/getWeekDay.js')

async function selectClass(bot, callbackQuery) {
    const className = callbackQuery.data.split('_')[1]
    const days = getWeekDays();
    let keyboard = [];

    for (let { date, day } of days) {
        keyboard.push([{ text: `📅 ${date} | ${day}`, callback_data: `schedule_${className}_${date}` }]);
    }

    keyboard.push([{ text: '⬅️ Назад', callback_data: 'back_selclass' }]);

    await bot.editMessageText(`📌 Класс: \`${className}\`\n\n❗️ Теперь необходимо выбрать день, который тебя интересует.`, {
        message_id: callbackQuery.message.message_id,
        chat_id: callbackQuery.message.chat.id,
        parse_mode: 'Markdown', 
        reply_markup: JSON.stringify({
            inline_keyboard: keyboard
        })
    })
}

module.exports = { selectClass }