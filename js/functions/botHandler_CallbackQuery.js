function botHandler_CallbackQuery(update) {
    if (!update.callback_query) return;

    const callbackQuery = update.callback_query;
    const chatId = callbackQuery.message.chat.id;
    const callbackData = callbackQuery.data;

    if (callbackData === "underconstruction") {
        telegramAPI('answerCallbackQuery', {
            callback_query_id: callbackQuery.id,
            text: "This feature is under construction!",
            show_alert: true
        });
    } else {
        displayMessage('Unhandled callback query: ' + callbackData, 'text-warning');
    }
}
