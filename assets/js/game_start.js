function game_start(update) {
    const chatId = update.message.chat.id;
    const from = update.message.from;
    const isPrivate = update.message.chat.type === "private";

    if (isPrivate) {
        sys_log_Send("Bot ini untuk dimainkan di grup. Silakan tambahkan bot ini ke grup Anda.", "text-warning");
    } else {
        // Logika untuk grup
        if (!groups[chatId]) {
            groups[chatId] = {
                starting: false,
                playing: false,
                starting_message_id: null,
                players: [],
                count_down: 0
            };
        }

        const group = groups[chatId];

        if (group.playing) {
            bot_sendMessage(chatId, "Permainan sedang berlangsung.");
        } else if (group.starting) {
            bot_sendMessage(chatId, "Ayo join!", {reply_parameters: JSON.stringify({message_id:group.starting_message_id})});
        } else {
            group.players.push(from);
            group.starting = true;
            group.count_down = START_COUNTDOWN;

            let playerList = group.players.map(player => `<a href='tg://user?id=${player.id}'>${player.first_name}</a>`).join("\n");

            let messageText = `Permainan akan dimulai dalam ${group.count_down} detik. Ayo join!\nPemain:\n${playerList}`;
            bot_sendMessage(chatId, messageText, {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "Join", callback_data: "join" }],
                        [{ text: "Extend", callback_data: "extend" }]
                    ]
                })
            }).then(data => {
                group.starting_message_id = data.result.message_id;
            });

            // Mulai countdown
            game_startCountdown(chatId);
        }
    }
}