const { getGrades } = require('../utils/getGrades.js')

async function grades(bot, msg) {
    const grade = await getGrades('Красков Максим', '10')
    let keyboard = [];

    for (let {name} of grade) {
        keyboard.push([{ text: `📖 ${name}`, callback_data: `grade_${name}_Красков=Максим_10` }]);
    }

    keyboard.push([{ text: '❌', callback_data: 'del' }, { text: '🌐', callback_data: 'calc' }]);

    await bot.sendMessage(msg.chat.id, `📌 Ученик: \`Красков Максим\`\nКласс: \`10\`\n\n❗️ Теперь необходимо выбрать предмет, оценки которого ты хочешь узнать.`, {
        parse_mode: 'Markdown', 
        reply_markup: JSON.stringify({
            inline_keyboard: keyboard
        })
    })
}

module.exports = { grades }