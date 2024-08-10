function botHandler_text_start(update) {
    if (!update.message || !update.message.chat) {
        console.error("Update message or chat data is missing");
        return;
    }

    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const firstName = update.message.from.first_name;
    const isGroupChat = update.message.chat.type !== 'private';

    if (!isGroupChat) {
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: "Bot ini hanya untuk bermain bersama teman. Masukkan bot ke dalam grup untuk bermain."
        });
        return;
    }

    let groupData = stateManager.get(`group_${chatId}`);
    
    if (!groupData) {
        groupData = {
            chatid: chatId,
            isStarting: false,
            isPlaying: false,
            players: []
        };
        stateManager.set(`group_${chatId}`, groupData);
    }

    if (groupData.isPlaying) {
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: "Permainan sedang berlangsung."
        });
    } else if (groupData.isStarting) {
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: "Kita sedang memulai permainan. Ayo bergabung!"
        });
    } else {
        groupData.isStarting = true;
        groupData.players.push({ userid: userId, first_name: firstName });
        stateManager.set(`group_${chatId}`, groupData);

        let playerList = groupData.players
            .map(player => `[${player.first_name}](tg://user?id=${player.userid})`)
            .join(', ');

        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: `${firstName} ingin memulai permainan. Ayo ikut!\n\nPemain: ${playerList}`,
            parse_mode: "Markdown",
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Join", callback_data: "join" }]
                ]
            })
        });
    }
}
