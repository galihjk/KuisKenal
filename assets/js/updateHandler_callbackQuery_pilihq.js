function updateHandler_callbackQuery_pilihq(update) {    
    const msgid = update.callback_query.message.message_id;
    const from = update.callback_query.from;
    const callbackData = update.callback_query.data;

    const groupid = callbackData.substring("pilihq~".length);
    const group = groups[groupid];
    if(!group || !group.currentTurnPlayer || !group.currentTurnPlayer.id){
        console.log(update);
        console.log(group);
        sys_log_Send("Error empty currentTurnPlayer ","text-danger");
        return;
    }
    if(!group.questions){
        console.log(update);
        console.log(group);
        sys_log_Send("Error empty questions ","text-danger");
        return;
    }
    const sbstrlen = "pilihq".length;
    let selected = group.questions[Number(callbackData.substring(sbstrlen,sbstrlen+1))-1];
    if(!selected){
        console.log(update);
        console.log(group);
        sys_log_Send("Error get question "+callbackData,"text-danger");
        return;
    }
    bot_answerCallbackQuery(update.callback_query.id, "Pertanyaan Dipilih");
    sys_log_Send(from.id+" Memilih pertanyaan untuk "+groupid);
    game_pilihPertanyaan_dipilih(groupid,from,selected,msgid);
}