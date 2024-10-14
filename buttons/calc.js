const { getGrades } = require('../utils/getGrades.js')
const { calculateNeededGrades } = require('../utils/calculateNeededGrades.js')

async function calc(bot, callbackQuery) {
    if (callbackQuery.data === 'calc') {
        const popupMessage = `❌ Ты не можешь узнать как повысить свой средний балл, не выбрав предмет.`;
        const opts = {
            show_alert: true,
        };
        bot.answerCallbackQuery(callbackQuery.id, { text: popupMessage, ...opts });
    } else {
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

        let calculate = calculateNeededGrades(all_grades, 2)

        await bot.sendMessage(callbackQuery.message.chat.id, `📌 Предмет: \`${lesson}\`\n\n📃 Твои оценки: \`${all_grades.toString()}\`\n📊 Сейчас: ${emj} \`${average.toFixed(2)}\`\n\nСколько нужно 5 для 4: \`${calculate.need5to4} (${calculate.averageTo4With5})\`\nСколько нужно 4 для 4: \`${calculate.need4to4} (${calculate.averageTo4With4})\`\nСколько нужно 5 для 5: \`${calculate.need5to5} (${calculate.averageTo5With5})\``, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [ { text: '❌', callback_data: 'del' } ]
                ]
            }
        })
    }
}

module.exports = { calc }