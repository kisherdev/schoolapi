const { getClasses } = require('../utils/getClasses.js')

async function start(bot, msg) {
    const classes = await getClasses();
    keyboard = []
    for (i of classes) {
        keyboard.push([{ text: i, callback_data: `class_${i}` }])
    }

    await bot.sendMessage(msg.chat.id, `👋 Привет! Я твой помощник, который может показать расписание на каждый день.\n\n❗️ Для начала - **выбери свой класс**.`, {
        parse_mode: "Markdown",
        reply_markup: JSON.stringify({
            inline_keyboard: keyboard
        })
    })
}

module.exports = { start }