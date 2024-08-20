function updateHandler_callbackQuery_pilihq(update) {
    const chatId = update.callback_query.message.chat.id;
    const userId = update.callback_query.from.id;
    const callbackData = update.callback_query.data;

    const groupid = callbackData.substring("pilihq~".length);
    const group = groups[groupid];
    if(!group || !group.currentTurnPlayer || !group.currentTurnPlayer.id){
        console.log(update);
        console.log(group);
        sys_log_Send("Error currentTurnPlayer "+chatId,"text-danger");
        return;
    }
    const sbstrlen = "pilihq".length;
    let selected = group.questions[Number(callbackData.substring(sbstrlen,sbstrlen+1))-1];
    bot_answerCallbackQuery(update.callback_query.id, "selected:"+selected,true);
}