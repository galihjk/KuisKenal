function updateHandler_callbackQuery_cnfrmJwb(update) {    
    const message = update.callback_query.message;
    const msgid = message.message_id;
    const chatId = message.chat.id;
    const from = update.callback_query.from;
    const callbackData = update.callback_query.data;
    bot_answerCallbackQuery(update.callback_query.id, "Diproses..");

    let groupid = null;
    let yakin = false;
    if(callbackData.startsWith("cnfrmJwbYa")){
        groupid = callbackData.substring("cnfrmJwbYa".length);
        yakin = true;
    }
    else if(callbackData.startsWith("cnfrmJwbTidak")){
        groupid = callbackData.substring("cnfrmJwbTidak".length);
    }
    else{
        sys_log_Send("Error Unhandled "+callbackData,"text-danger");
        console.log("Error Unhandled", update);
        return;
    }
    if(!groupid){
        sys_log_Send("Error empty groupid ","text-danger");
        console.log("Error empty groupid", update);
        return;
    }
    const group = groups[groupid];
    if(!group){
        console.log("Error empty group",groupid,groups);
        sys_log_Send("Error empty group","text-danger");
        return;
    }
    if(!group.confirmJawab || !group.confirmJawab[chatId]){
        console.log("Error empty confirmJawab ",group,chatId,update);
        sys_log_Send("Error empty confirmJawab ","text-danger");
        return;
    }
    if(yakin){
        game_jawabPertanyaan_dijawab_yakin(groupid,message);
    }
    else{
        bot_deleteMessage(chatId,msgid);
        game_jawabPertanyaan(groupid,message);
    }
}