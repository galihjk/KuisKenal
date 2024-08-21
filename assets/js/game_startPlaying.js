function game_startPlaying(chatId){
    const group = groups[chatId];
    group.starting = false;
    group.playing = true;
    // Lanjutkan logika permainan
    bot_editMessageText(chatId, group.starting_message_id, `Permainan sudah dimulai!`);
    group.turns = [...group.players]; // Salin daftar pemain untuk giliran
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