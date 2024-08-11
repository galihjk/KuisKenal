function botHandler_CallbackQuery_extend(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    let groupData = stateManager.get(`group_${chatId}`);

    groupData.countdown = EXTEND_COUNTDOWN;
    stateManager.set(`group_${chatId}`, groupData);

    telegramAPI('answerCallbackQuery', {
        callback_query_id: callbackQuery.id,
        text: `Waktu diperpanjang menjadi ${EXTEND_COUNTDOWN} detik lagi.`
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
