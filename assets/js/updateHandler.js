function updateHandler(update) {
    let virtualPlayer = $("#virtualPlayer");
    if(virtualPlayer){
        if(virtualPlayer.is(':checked')){
            if(update.message && update.message.from){
                update.message.from = {
                    "id": 227024161,
                    "is_bot": false,
                    "first_name": "VP1",
                    "username": "VP1",
                    "language_code": "id"
                };
            }
            if(update.callback_query && update.callback_query.from){
                update.callback_query.from = {
                    "id": 227024161,
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
    // Tambahkan handler untuk tipe update lain jika diperlukan
}
