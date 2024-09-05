function game_cekJawaban_done(groupid,message){
    // console.log("game_cekJawaban_done",groupid,message);
    const group = groups[groupid];
    if(!group){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }
    let text_to_send = group.q+"\n\n";
    group.cekjawaban.forEach((i,k)=>{
        text_to_send += (i.benar ? "✅" : "❌") + (Number(k)+1) + ". " + i.jwb+"\n";
    });
    text_to_send += "\n\nSilakan kembali ke group.";
    bot_editMessageText(message.chat.id, message.message_id, text_to_send);
    text_to_send = helper_mentionPlayer(group.currentTurnPlayer.id,groupid) + " sudah mengecek jawabannya. Pemain yang berhasil menjawab: ";
    let pemain_benar = [];
    group.cekjawaban.forEach(i=>{
        if(i.benar){
            i.players.forEach(ii=>{
                pemain_benar.push(helper_mentionPlayer(ii,groupid));
                let playerfind = group.players.find(iii=>iii.id == ii);
                if(playerfind){
                    if(!playerfind.skor) playerfind.skor = 0;
                    playerfind.skor ++;
                }
                else{
                    return sys_log_Send("Error game_cekJawaban_done playerfind "+ii,"text-danger");
                }
            })
        }
    });
    sys_log_Send(group.currentTurnPlayer.id,groupid+" sudah cek jawaban untuk "+groupid);
    group.cekjawaban = null;
    if(!pemain_benar.length){
        text_to_send += "TIDAK ADA";
    }
    else{
        text_to_send += pemain_benar.join(", ");
    }
    text_to_send += "\n\nPerolehan skor:\n";
    group.players.forEach(i=>{
        text_to_send += helper_mentionPlayer(i.id, groupid)+": "+(i.skor??0)+"\n"
    })
    bot_sendMessage(groupid, text_to_send);  
    setTimeout(() => {
        game_startTurn(groupid);
    }, 1500);
}