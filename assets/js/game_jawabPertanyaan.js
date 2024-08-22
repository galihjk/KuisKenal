function game_jawabPertanyaan(groupid,message){
    const chatId = message.chat.id;
    if(!groups || !groupid || !groups[groupid]){
        sys_log_Send("Error empty group","text-danger");
        bot_sendMessage(groupid, "Group ini sedang tidak bermain. \n\n/start - mulai");
        bot_sendMessage(chatId, "Group ini sedang tidak bermain. \n\n/start - mulai");
        return;
    }
    const group = groups[groupid];
    if(!group.playing){
        bot_sendMessage(groupid, "Group ini sedang tidak bermain. \n\n/start - mulai");
        bot_sendMessage(chatId, "Group ini sedang tidak bermain. \n\n/start - mulai");
        return;
    }
    if(!group.currentTurnPlayer || !group.currentTurnPlayer.id){
        sys_log_Send("Error currentTurnPlayer "+groupid,"text-danger");
        return;
    }
    if(!group.q){
        sys_log_Send("Error group.q "+groupid,"text-danger");
        return;
    }
    if(group.currentTurnPlayer.id == chatId){
        bot_sendMessage(chatId, "Yang harus menjawab adalah peserta lain selain Anda!");
        return;
    }
    group.players.forEach(p => {
        if(p.id != group.currentTurnPlayer.id){
            waiting_private_answer[p.id] = groupid;
            bot_sendMessage(p.id, group.q);
        }
    });
    
}