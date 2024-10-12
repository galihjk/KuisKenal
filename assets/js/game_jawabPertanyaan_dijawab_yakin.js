function game_jawabPertanyaan_dijawab_yakin(groupid,message){
    const chatId = message.chat.id;
    const msgid = message.message_id;
    const group = groups[groupid];
    let jawaban_yakin = "";
    if(!group){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }
    if(!group.confirmJawab || !group.confirmJawab[chatId]){
        sys_log_Send("Error empty group.confirmJawab "+chatId,"text-danger");
        console.log("Error empty group.confirmJawab", chatId, group);
        return;
    }
    jawaban_yakin = group.confirmJawab[chatId];
    group.confirmJawab[chatId] = false;
    if(!group.jawaban) group.jawaban = {};
    group.jawaban[chatId] = jawaban_yakin;
    bot_editMessageText(chatId,msgid,"Jawaban Anda:\n"+jawaban_yakin+"\n\nSilakan kembali ke grup.");
    const player = group.players.find(i=>i.id == chatId);
    const yang_belum = group.players.filter(p=>!group.jawaban[p.id] && group.currentTurnPlayer.id != p.id);
    const yang_belum_show = yang_belum.map(p => helper_mentionPlayer(p.id, groupid)).join(", ");
    console.log(yang_belum, yang_belum.length);
    if(yang_belum.length){
        group.players.map(p => helper_mentionPlayer(player.id, groupid)).join("\n");
        bot_sendMessage(groupid, `${player.first_name} sudah menjawab. Yang belum: ${yang_belum_show}`);   
    }
    else{
        bot_sendMessage(groupid, `${player.first_name} sudah menjawab. Semua pemain sudah menjawab.`);  
        setTimeout(() => {
            bot_sendMessage(groupid, 
                `${helper_mentionPlayer(group.currentTurnPlayer.id, groupid)}\n Ayo cek jawabannya`, 
                {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{ text: "Cek Jawaban", url: "t.me/"+botUsername+"?start=cekjwb_"+groupid }],
                        ]
                    })
                }
            );
        }, 500);
    }
}