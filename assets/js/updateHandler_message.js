function updateHandler_message(update) {
    const message = update.message;
    const chatId = message.chat.id;

    if(message.text){
        if (message.text.startsWith("/start")) {
            updateHandler_message_start(update);
        }
        else if(waiting_private_answer[chatId]){
            game_jawabPertanyaan_dijawab(message);
        }
        else{
            sys_log_Send("incoming: "+chatId);
            if(!groups[chatId] || 
                (groups[chatId] && !groups[chatId].playing && !groups[chatId].starting)
            )
            bot_sendMessage(chatId, "/start@"+botUsername+" - Mulai");
        }
    }
}
