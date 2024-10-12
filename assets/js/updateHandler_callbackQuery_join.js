function updateHandler_callbackQuery_join(update) {
    const chatId = update.callback_query.message.chat.id;
    const userId = update.callback_query.from.id;
    const group = groups[chatId];

    if (group.players.some(player => player.id === userId)) {
        bot_answerCallbackQuery(update.callback_query.id, "Anda sudah join.",true);
    } else {
        sys_log_Send("Pemain "+update.callback_query.from.id+" mengikuti permainan di "+chatId);
        group.players.push(update.callback_query.from);
        bot_answerCallbackQuery(update.callback_query.id, "Anda berhasil join!",true);
        // Update message with new player list
        let playerList = group.players.map(player => helper_mentionPlayer(player.id, chatId)).join("\n");
        bot_editMessageText(chatId, group.starting_message_id, `Permainan akan dimulai dalam ${group.count_down} detik. Ayo join!\nPemain:\n${playerList}`,{
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Join", callback_data: "join" }],
                    [{ text: "Extend", callback_data: "extend" }]
                ]
            })
        });
    }
}