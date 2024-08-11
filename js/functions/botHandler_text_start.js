function botHandler_text_start(update) {
    if (!update.message || !update.message.chat) {
        console.error("Update message or chat data is missing");
        return;
    }

    const chatId = update.message.chat.id;
    const chatType = update.message.chat.type;
    const userId = update.message.from.id;
    const firstName = update.message.from.first_name;

    if (chatType === 'private') {
        telegramAPI('sendMessage', { chat_id: chatId, text: 'Bot ini untuk bermain bersama teman dan perlu dimasukkan ke grup.' });
        return;
    }

    let groupData = stateManager.get(`group_${chatId}`) || {
        chatId: chatId,
        isStarting: false,
        isPlaying: false,
        players: [],
    };

    if (groupData.isPlaying) {
        telegramAPI('sendMessage', { chat_id: chatId, text: 'Permainan sedang berlangsung.' });
        return;
    }

    if (groupData.isStarting) {
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: `${firstName}, Ayo join!`,
            reply_to_message_id: groupData.message_id,
        });
        return;
    }

    groupData.isStarting = true;
    groupData.players.push({ userId: userId, firstName: firstName });
    groupData.countdown = STARTING_COUNTDOWN;

    telegramAPI('sendMessage', {
        chat_id: chatId,
        text: `Permainan akan dimulai dalam ${groupData.countdown} detik, ayo join!\nPemain:\n${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}`,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Join', callback_data: 'join' }],
                [{ text: 'Extend', callback_data: 'extend' }]
            ]
        }
    }).then(response => {
        // console.log(response);
        groupData.message_id = response.result.message_id;
        stateManager.set(`group_${chatId}`, groupData);
        countdown_start(chatId);
    });
}
