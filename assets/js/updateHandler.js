function updateHandler(update) {
    let virtualPlayer = $("#virtualPlayer");
    if(virtualPlayer){
        if(virtualPlayer.is(':checked')){
            if(update.message && update.message.from){
                update.message.from = {
                    "id": 999999999,
                    "is_bot": false,
                    "first_name": "VP1",
                    "username": "VP1",
                    "language_code": "id"
                };
            }
            if(update.message && update.message.chat.type === "private"){
                update.message.chat.id = 999999999;
            }
            if(update.callback_query && update.callback_query.message.chat.type === "private"){
                update.callback_query.message.chat.id = 999999999;
            }
            if(update.callback_query && update.callback_query.from){
                update.callback_query.from = {
                    "id": 999999999,
                    "is_bot": false,
                    "first_name": "VP1",
                    "username": "VP1",
                    "language_code": "id"
                };
            }
        }
    }
    if (update.message) {
        updateHandler_message(update);
    } else if (update.callback_query) {
        updateHandler_callbackQuery(update);
    }
    else if (update.my_chat_member && update.my_chat_member.chat && update.my_chat_member.chat.id){
        const groupid = update.my_chat_member.chat.id;
        bot_sendMessage(groupid, "/start@"+botUsername+" - Mulai").then(()=>{        
            sys_log_Send("Bot added to group "+groupid, "text-info");
        });
    }
    // Tambahkan handler untuk tipe update lain jika diperlukan
}
