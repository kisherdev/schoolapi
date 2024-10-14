const { getGrades } = require('../utils/getGrades.js')

async function grade(bot, callbackQuery) {
    const lesson = callbackQuery.data.split('_')[1]
    const clas = callbackQuery.data.split('_')[3]
    const name = callbackQuery.data.split('_')[2].split('=')

    const grades = await getGrades(`${name[0]} ${name[1]}`, clas)
    const lesson_grades = grades.find(item => item.name === lesson)
    let sum = 0;
    let all_grades = []
    for (let grade of lesson_grades.value) {
        sum += grade.value
        all_grades.push(grade.value)
    }
    let average = sum / all_grades.length;
    let emj = ''

    if (average < 2 || average === 2) {
        emj = '🟥'
    } else if (average < 3.5) {
        emj = '🟧'
    } else if (average < 4.5) {
        emj = '🟨'
    } else {
        emj = '🟩'
    }

    const currentKeyboard = callbackQuery.message.reply_markup.inline_keyboard;
    const updatedKeyboard = currentKeyboard.map(row => 
        row.map(button => {
            if (button.callback_data === callbackQuery.data) {
                return { ...button, text: `👀 ${lesson}`, callback_data: `inactive_${lesson}_${name[0]}=${name[1]}_${clas}` };
            } else if (button.callback_data === 'del') {
                return { ...button, text: `❌` };
            } else if (button.callback_data.startsWith('calc')) {
                return { ...button, text: '🌐', callback_data: `calc_${lesson}_${name[0]}=${name[1]}_${clas}` };
            } else {
                const otherLesson = button.callback_data.split('_')[1];
                return { ...button, text: `📖 ${otherLesson}`, callback_data: `grade_${otherLesson}_${name[0]}=${name[1]}_${clas}` };
            }
        })
    );

    let txt = `📌 Ученик: \`Красков Максим\`\nКласс: \`10\`\nПредмет: \`${lesson}\`\n\n📃 Твои оценки:\n${lesson_grades.value.map(item => `📅 ${item.date}: \`${item.value}\``).join('\n')}\n\n📊 Средний балл: ${emj} \`${average.toFixed(2)}\`\n\n🌐 \`Как повысить средний балл?\``;

    await bot.editMessageText(txt, {
        message_id: callbackQuery.message.message_id,
        chat_id: callbackQuery.message.chat.id,
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: updatedKeyboard }
    });
}

module.exports = { grade }