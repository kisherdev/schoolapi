async function inactive(bot, callbackQuery) {
    const lesson = callbackQuery.data.split('_')[1]
    const popupMessage = `❌ Ты уже просматриваешь урок "${lesson}".`;
    const opts = {
        show_alert: true,
    };
    bot.answerCallbackQuery(callbackQuery.id, { text: popupMessage, ...opts });
}

module.exports = { inactive }