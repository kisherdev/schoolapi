async function del(bot, callbackQuery) {
    await bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id)
}

module.exports = { del }