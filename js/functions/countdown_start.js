function countdown_start(chatId) {
    const intervalId = setInterval(() => {
        let groupData = stateManager.get(`group_${chatId}`);
        if (!groupData) return;

        groupData.countdown--;

        if (groupData.countdown <= 0) {
            clearInterval(intervalId);
            countdown_finalize(chatId);
        } else {
            stateManager.set(`group_${chatId}`, groupData);

            if (groupData.countdown % NOTIFICATION_INTERVAL === 0) {
                telegramAPI('sendMessage', {
                    chat_id: chatId,
                    text: `Permainan akan dimulai dalam ${groupData.countdown} detik lagi.`,
                    reply_to_message_id: groupData.message_id
                });

                telegramAPI('editMessageText', {
                    chat_id: chatId,
                    message_id: groupData.message_id,
                    text: `Permainan akan dimulai dalam ${groupData.countdown} detik lagi, ayo join!\nPemain:\n${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}`,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Join', callback_data: 'join' }],
                            [{ text: 'Extend', callback_data: 'extend' }]
                        ]
                    }
                });
            }
        }
    }, 1000);
}
