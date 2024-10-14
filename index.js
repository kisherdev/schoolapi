const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api');
const { token } = require('./config.json');
const bot = new TelegramBot(token, { polling: true });

const { start } = require('./commands/start.js')
const { grades } = require('./commands/grades.js')
const { selectClass } = require('./buttons/selectClass.js')
const { back } = require('./buttons/back.js')
const { selectDate } = require('./buttons/selectDate.js')
const { grade } = require('./buttons/grade.js')
const { inactive } = require('./buttons/inactive.js')
const { calc } = require('./buttons/calc.js')
const { del } = require('./buttons/del.js')

bot.on('message', async msg => {
    if (msg.text === '/start') return start(bot, msg);
    if (msg.text === '/grades') return grades(bot, msg);
})

bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    if (action.startsWith('class_')) return selectClass(bot, callbackQuery);
    if (action.startsWith('back_')) return back(bot, callbackQuery);
    if (action.startsWith('schedule_')) return selectDate(bot, callbackQuery);
    if (action.startsWith('grade_')) return grade(bot, callbackQuery);
    if (action.startsWith('inactive_')) return inactive(bot, callbackQuery);
    if (action.startsWith('calc')) return calc(bot, callbackQuery);
    if (action.startsWith('del')) return del(bot, callbackQuery);
})