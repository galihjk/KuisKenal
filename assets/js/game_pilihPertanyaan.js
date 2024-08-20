function game_pilihPertanyaan(groupid,from){
    if(!groups || !groupid || !groups[groupid]){
        sys_log_Send("Error empty group","text-danger");
        bot_sendMessage(groupid, "Group ini sedang tidak bermain. \n\n/start - mulai");
        bot_sendMessage(from.id, "Group ini sedang tidak bermain. \n\n/start - mulai");
        return;
    }
    const group = groups[groupid];
    if(!group.playing){
        bot_sendMessage(groupid, "Group ini sedang tidak bermain. \n\n/start - mulai");
        bot_sendMessage(from.id, "Group ini sedang tidak bermain. \n\n/start - mulai");
        return;
    }
    if(!group.currentTurnPlayer || !group.currentTurnPlayer.id){
        sys_log_Send("Error currentTurnPlayer "+groupid,"text-danger");
        return;
    }
    if(group.currentTurnPlayer.id != from.id){
        bot_sendMessage(from.id, "Saat ini bukan giliran Anda!");
        return;
    }
    group.questions = [
        `Apa warna kesukaan ${from.first_name}?`,
        `Apa hewan kesukaan ${from.first_name}?`,
        `Apa makanan kesukaan ${from.first_name}?`
    ];
    bot_sendMessage(from.id, 
        "Pilih salah satu pertanyaan berikut:\n"
        + group.questions.map((q,k) => `${1+k}. ${q}`).join("\n")
        , {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "1", callback_data: "pilihq1"+groupid },{ text: "2", callback_data: "pilihq2"+groupid },{ text: "3", callback_data: "pilihq3"+groupid }],
                ]
            })
        }
    );
    
    

}