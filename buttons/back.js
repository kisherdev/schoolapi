const { getClasses } = require('../utils/getClasses.js')
const { getWeekDays } = require('../utils/getWeekDay.js')

async function back(bot, callbackQuery) {
    action = callbackQuery.data.split('_')[1]
    if (action === 'selclass') {
        const classes = await getClasses();
        keyboard = []
        for (i of classes) {
            keyboard.push([{ text: i, callback_data: `class_${i}` }])
        }
    
        await bot.editMessageText(`👋 Привет! Я твой помощник, который может показать расписание на каждый день.\n\n❗️ Для начала - **выбери свой класс**.`, {
            message_id: callbackQuery.message.message_id,
            chat_id: callbackQuery.message.chat.id,
            parse_mode: "Markdown",
            reply_markup: JSON.stringify({
                inline_keyboard: keyboard
            })
        })
    } if (action === 'seldate') {
        const className = callbackQuery.data.split('_')[2]
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
}

module.exports = { back }