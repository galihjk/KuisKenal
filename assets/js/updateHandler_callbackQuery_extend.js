function updateHandler_callbackQuery_extend(update) {
    const chatId = update.callback_query.message.chat.id;
    const group = groups[chatId];
    group.count_down = EXTEND_COUNTDOWN;
    bot_answerCallbackQuery(update.callback_query.id, `Waktu tunggu menjadi ${EXTEND_COUNTDOWN} detik.`,true);
    let playerList = group.players.map(player => `<a href='tg://user?id=${player.id}'>${player.first_name}</a>`).join("\n");
    bot_editMessageText(chatId, group.starting_message_id, `Permainan akan dimulai dalam ${group.count_down} detik. Ayo join!\nPemain:\n${playerList}`,{
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Join", callback_data: "join" }],
                [{ text: "Extend", callback_data: "extend" }]
            ]
        })
    });
}
