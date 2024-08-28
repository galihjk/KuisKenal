function game_startTurn(chatId){
    const group = groups[chatId];
    if(!group.turns || !group.turns.length){
        groups[chatId] = {
            starting: false,
            playing: false,
            starting_message_id: null,
            players: [],
            count_down: 0
        };
        bot_sendMessage(chatId,"Permainan Berakhir! /start");
        return;
    }
    group.currentTurnPlayer = group.turns.shift(); // Ambil pemain pertama
    let currentTurnPlayer = group.currentTurnPlayer;
    bot_sendMessage(chatId, 
        `${helper_mentionPlayer(currentTurnPlayer.id, chatId)} silakan pilih pertanyaan!`, 
        {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Pilih Pertanyaan", url: "t.me/"+botUsername+"?start=pil_"+chatId }],
                ]
            })
        }
    );
}