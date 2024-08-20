function updateHandler_message_start(update) {
    const message = update.message;
    const chatId = message.chat.id;
    const from = message.from;
    const isPrivate = message.chat.type === "private";

    if (isPrivate) {
        if(message.text){
            if(message.text.startsWith("/start pil_")){
                let my_playing_group = message.text.substring("/start pil_".length);
                bot_sendMessage(chatId, "Pilih pertanyaan! Anda sedang bermain di "+my_playing_group);
            }
            else{
                bot_sendMessage(chatId, "Bot ini untuk dimainkan di grup. Silakan tambahkan bot ini ke grup Anda.");
            }
        }
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
            bot_sendMessage(chatId, "Permainan sedang berlangsung. Bila ingin menghentikan permainan, admin grup dapat menggunakan command /force_stop");
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