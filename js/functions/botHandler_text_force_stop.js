function botHandler_text_forceStop(update) {
    const chatId = update.message.chat.id;
    let groupData = stateManager.get(`group_${chatId}`);

    if (groupData.isPlaying) {
        groupData.isPlaying = false;
        groupData.players = [];
        telegramAPI('sendMessage', { chat_id: chatId, text: 'Permainan dihentikan paksa.' });
        stateManager.set(`group_${chatId}`, groupData);
    }
}
