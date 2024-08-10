function botHandler_CallbackQuery_join(callbackQuery) {
    telegramAPI('answerCallbackQuery', {
        callback_query_id: callbackQuery.id,
        text: "Join under construction",
        show_alert: true
    });
}
