function game_cekJawaban(groupid,message){
    console.log("game_cekJawaban",groupid,message);
    const chatId = message.chat.id;

    const group = groups[groupid];
    if(!group){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }
    if(!group.jawaban){
        sys_log_Send("Error empty group.jawaban "+groupid,"text-danger");
        console.log("Error empty group.jawaban", groups, groupid);
        return;
    }
    let jwbs = [];
    console.log(group.jawaban);
    Object.keys(group.jawaban).forEach(k=>{
        let jwbk = group.jawaban[k].toLowerCase().replaceAll(' ', '');
        let jwbs_find = jwbs.find(i=>i.jwbk == jwbk);
        if(jwbs_find){
            jwbs_find.players.push(k);
        }
        else{
            jwbs.push({
                jwbk: jwbk,
                jwb: group.jawaban[k],
                players: [k],
            })
        }
    });
    console.log(jwbs);

    let text_to_send = "Berikut ini jawaban teman-teman Anda:\n\n";
    let inline_keyboard = [];
    jwbs.forEach((i,k)=>{
        text_to_send += (Number(k)+1) + ". " + i.jwb+"\n\n";
        inline_keyboard.push([{
            text: "[ - ] "+(Number(k)+1)+". " + i.jwb.substring(0, 6) + "...",
            callback_data: "checkjwb_true"+(Number(k)+1)+"~"+groupid,
        }])
    });
    inline_keyboard.push([{
        text: "SELESAI",
        callback_data: "checkjwb_done",
    }])
    text_to_send += "Pilih jawaban yang layak untuk dianggap benar (boleh lebih dari 1), jika sudah, klik tombol [SELESAI].";
    bot_sendMessage(chatId, text_to_send,{
        reply_markup: JSON.stringify({
            inline_keyboard: inline_keyboard
        })
    });
}