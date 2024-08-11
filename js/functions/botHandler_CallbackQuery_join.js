function botHandler_CallbackQuery_join(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const firstName = callbackQuery.from.first_name;
    let groupData = stateManager.get(`group_${chatId}`);

    if (groupData.players.some(player => player.userId === userId)) {
        telegramAPI('answerCallbackQuery', {
            callback_query_id: callbackQuery.id,
            text: 'Anda sudah join',
            show_alert: true
        });
        return;
    }

    groupData.players.push({ userId: userId, firstName: firstName });
    stateManager.set(`group_${chatId}`, groupData);

    telegramAPI('answerCallbackQuery', {
        callback_query_id: callbackQuery.id,
        text: 'Berhasil join'
    });

    telegramAPI('editMessageText', {
        chat_id: chatId,
        message_id: groupData.message_id,
        text: `Permainan akan dimulai dalam ${groupData.countdown} detik, ayo join!\nPemain:\n${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}`,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Join', callback_data: 'join' }],
                [{ text: 'Extend', callback_data: 'extend' }]
            ]
        }
    });
}
