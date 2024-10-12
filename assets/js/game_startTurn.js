function game_startTurn(chatId){
    const group = groups[chatId];
    if(!group.turns || !group.turns.length){
        var scores = [];
        group.players.forEach(i=>{
            if (!i.skor) i.skor = 0;
            scores.push({
                id: i.id,
                skor: i.skor,
            });
        });
        scores = scores.sort((a, b) => b.skor - a.skor);
        scoretext = scores.map(i => helper_mentionPlayer(i.id, chatId) + ": " + i.skor).join("\n");

        groups[chatId] = {
            starting: false,
            playing: false,
            starting_message_id: null,
            players: [],
            count_down: 0
        };
        sys_log_Send("Permainan berakhir untuk "+chatId);
        bot_sendMessage(chatId,"Permainan Berakhir!\n"+scoretext+"\n\n/start@"+botUsername);
        return;
    }
    group.currentTurnPlayer = group.turns.shift(); // Ambil pemain pertama
    let currentTurnPlayer = group.currentTurnPlayer;
    sys_log_Send("Giliran "+group.currentTurnPlayer.id+" dalam permainan "+chatId);
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