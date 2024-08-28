function game_cekJawaban_dipilih(groupid,message,indexJwb,isJawabanTrue){
    // console.log("game_cekJawaban_dipilih",groupid,message,indexJwb,isJawabanTrue);
    const group = groups[groupid];
    if(!group){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }

    let text_to_send = "Berikut ini jawaban teman-teman Anda:\n\n";
    let inline_keyboard = [];
    group.cekjawaban.forEach((i,k)=>{
        if(indexJwb == Number(k)+1){
            if(isJawabanTrue){
                i.benar = true;
            }
            else{
                i.benar = false;
            }
        }
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
    bot_editMessageText(message.chat.id, message.message_id, text_to_send, {
        reply_markup: JSON.stringify({
            inline_keyboard: inline_keyboard
        })
    });
}