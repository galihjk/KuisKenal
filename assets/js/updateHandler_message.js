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
    }
}
