function game_jawabPertanyaan_dijawab(message){
    const chatId = message.chat.id;
    let groupid = waiting_private_answer[chatId];
    const group = groups[groupid];
    if(!group){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }
    waiting_private_answer[chatId] = false;
    const jawaban = message.text;
    if(!group.confirmJawab) group.confirmJawab = {};
    group.confirmJawab[chatId] = jawaban;
    bot_sendMessage(chatId, "Jawaban Anda:\n\n"+jawaban+"\n\nApakah Anda yakin?",{
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: "Ya", callback_data: "cnfrmJwbYa"+groupid },
                    { text: "Tidak", callback_data: "cnfrmJwbTidak"+groupid },
                ],
            ]
        })
    });
    
}