function game_cekJawaban(groupid,message){
    // console.log("game_cekJawaban",groupid,message);
    const chatId = message.chat.id;

    if(!groups || !groupid || !groups[groupid] || (groups[groupid] && !groups[groupid].playing)){
        // sys_log_Send("Error empty group","text-danger");
        bot_sendMessage(groupid, "Group ini sedang tidak bermain. \n\n/start - mulai");
        bot_sendMessage(chatId, "Group ini sedang tidak bermain. \n\n/start - mulai");
        return;
    }

    const group = groups[groupid];
    
    if(!group.jawaban){
        sys_log_Send("Error empty group.jawaban "+groupid,"text-danger");
        console.log("Error empty group.jawaban", groups, groupid);
        return;
    }
    if(!group.currentTurnPlayer || !group.currentTurnPlayer.id){
        sys_log_Send("Error currentTurnPlayer "+groupid,"text-danger");
        return;
    }
    if(group.currentTurnPlayer.id != chatId){
        bot_sendMessage(chatId, "Saat ini bukan giliran Anda!");
        return;
    }
    if(!group.cekjawaban){
        group.cekjawaban = [];
        Object.keys(group.jawaban).forEach(k=>{
            let jwbk = group.jawaban[k].toLowerCase().replaceAll(' ', '');
            let jwbs_find = group.cekjawaban.find(i=>i.jwbk == jwbk);
            if(jwbs_find){
                jwbs_find.players.push(k);
            }
            else{
                group.cekjawaban.push({
                    jwbk: jwbk,
                    jwb: group.jawaban[k],
                    players: [k],
                })
            }
        });
    }

    let text_to_send = "Berikut ini jawaban teman-teman Anda:\n\n";
    let inline_keyboard = [];
    group.cekjawaban.forEach((i,k)=>{
        text_to_send += (i.benar ? "✅" : "") + (Number(k)+1) + ". " + i.jwb+"\n\n";
        inline_keyboard.push([{
            text: (i.benar ? "[✅] " : "[ - ] ")+(Number(k)+1)+". " + i.jwb.substring(0, 12) + "..." + (i.benar ? " [✅] " : " [ - ]"),
            callback_data: (i.benar ? "checkjwb_false" : "checkjwb_true")+(Number(k)+1)+"~"+groupid,
        }])
    });
    inline_keyboard.push([{
        text: "SELESAI",
        callback_data: "checkjwb_done~"+groupid,
    }])
    text_to_send += "Pilih jawaban yang layak untuk dianggap benar (boleh lebih dari 1), jika sudah, klik tombol [SELESAI].";
    if(group.currentTurnPlayer.cekJwbMsgId){
        bot_deleteMessage(chatId, group.currentTurnPlayer.cekJwbMsgId);
        group.currentTurnPlayer.cekJwbMsgId = false;
    }
    bot_sendMessage(chatId, text_to_send,{
        reply_markup: JSON.stringify({
            inline_keyboard: inline_keyboard
        })
    }).then(data => {
        group.currentTurnPlayer.cekJwbMsgId = data.result.message_id;
    });
    
}