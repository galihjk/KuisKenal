function game_jawabPertanyaan_dijawab(message){
    const chatId = message.chat.id;
    let groupid = waiting_private_answer[chatId];
    bot_sendMessage(chatId, "jawab"+groupid);
}