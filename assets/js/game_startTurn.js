function game_startTurn(chatId){
    const group = groups[chatId];
    if(!group.turns || !group.turns.length){
        bot_sendMessage(chatId,"Permainan Berakhir!");
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