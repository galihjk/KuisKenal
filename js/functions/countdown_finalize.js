function countdown_finalize(chatId) {
    let groupData = stateManager.get(`group_${chatId}`);
    groupData.isStarting = false;
    if (groupData.players.length < MINIMUM_PLAYER) {
        telegramAPI('editMessageText', {
            chat_id: groupData.chatId,
            message_id: groupData.message_id,
            text: `${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}`+'\n\nPermainan dibatalkan karena kurangnya pemain. Minimal: ' + MINIMUM_PLAYER,
            parse_mode: 'Markdown',
        });
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: `${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}\n\nPermainan dibatalkan karena kurangnya pemain. Minimal: ${MINIMUM_PLAYER}`,
            parse_mode: 'Markdown',
        });
        groupData.players = [];
    } else {
        telegramAPI('editMessageText', {
            chat_id: groupData.chatId,
            message_id: groupData.message_id,
            text: `PERMAINAN TELAH DIMULAI\n\nPemain:\n${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}`,
            parse_mode: 'Markdown',
        });
        groupData.isPlaying = true;
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: `${groupData.players.map(player => `[${player.firstName}](tg://user?id=${player.userId})`).join('\n')}\n\Permainan dimulai!`,
            parse_mode: 'Markdown',
        });
    }

    stateManager.set(`group_${chatId}`, groupData);
}
