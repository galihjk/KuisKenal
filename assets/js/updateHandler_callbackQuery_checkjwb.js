function updateHandler_callbackQuery_checkjwb(update) {
    const message = update.callback_query.message;
    const chatId = message.chat.id;
    const userId = update.callback_query.from.id;
    const callbackData = update.callback_query.data;
    const groupid = callbackData.split("~").pop();
    if(!groupid || !groups[groupid]){
        sys_log_Send("Error empty group "+groupid,"text-danger");
        console.log("Error empty group", groups, groupid);
        return;
    }
    bot_answerCallbackQuery(update.callback_query.id, "Diproses...");
    if(callbackData.startsWith("checkjwb_done")){
        game_cekJawaban_done(groupid,message);
    }
    else{
        let indexJwb = 0;
        let isJawabanTrue = false;
        if(callbackData.startsWith("checkjwb_true")){
            indexJwb = Number(callbackData.replace("checkjwb_true","").replace("~"+groupid,""));
            isJawabanTrue = true;
        }
        else if(callbackData.startsWith("checkjwb_false")){
            indexJwb = Number(callbackData.replace("checkjwb_false","").replace("~"+groupid,""));
            isJawabanTrue = false;
        }
        else{
            console.log("Error Unhandled: ", callbackData, update);
            return;
        }
        game_cekJawaban_dipilih(groupid,message,indexJwb,isJawabanTrue);
    }

}