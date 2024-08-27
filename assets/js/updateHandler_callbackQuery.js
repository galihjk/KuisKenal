function updateHandler_callbackQuery(update) {
    const callbackData = update.callback_query.data;
    const chatId = update.callback_query.message.chat.id;

    if (callbackData.startsWith("join")) {
        updateHandler_callbackQuery_join(update);
    } else if (callbackData.startsWith("extend")) {
        updateHandler_callbackQuery_extend(update);
    } else if (callbackData.startsWith("pilihq")) {
        updateHandler_callbackQuery_pilihq(update);
    }else if (callbackData.startsWith("cnfrmJwb")) {
        updateHandler_callbackQuery_cnfrmJwb(update);
    }
}
