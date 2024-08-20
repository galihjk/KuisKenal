function game_startCountdown(chatId) {
    const group = groups[chatId];
    let playerList = group.players.map(player => `<a href='tg://user?id=${player.id}'>${player.first_name}</a>`).join("\n");

    const interval = setInterval(() => {
        if (!group.starting || group.count_down <= 0) {
            clearInterval(interval);
            if (group.players.length < MIN_PLAYERS) {
                group.starting = false;
                bot_editMessageText(chatId, group.starting_message_id, `Permainan dibatalkan karena jumlah pemain kurang`);
                bot_sendMessage(chatId, `Mohon maaf, ${group.players.map(player => player.first_name).join(", ")}. Permainan batal karena kurang peserta.`);
                group.players = [];
            } else {    
                bot_sendMessage(chatId, "Permainan dimulai!\n"+playerList);
                game_startPlaying(chatId);
            }
        } else {
            group.count_down--;
            if (group.count_down > 3 && group.count_down % NOTIFICATION_INTERVAL === 0) {
                bot_sendMessage(chatId, `Permainan akan dimulai dalam ${group.count_down} detik.`, {reply_parameters: JSON.stringify({message_id:group.starting_message_id})});
                bot_editMessageText(chatId, group.starting_message_id, `Permainan akan dimulai dalam ${group.count_down} detik. Ayo join!\nPemain:\n${playerList}`,{
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: "Join", callback_data: "join" }],
                            [{ text: "Extend", callback_data: "extend" }]
                        ]
                    })
                })
            }
        }
    }, 1000);
}