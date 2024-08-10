function botHandler_CallbackQuery(update) {
    if (!update.callback_query) return;

    const callbackQuery = update.callback_query;
    const callbackData = callbackQuery.data;

    const handlers = {
        "join": botHandler_CallbackQuery_join
        // Anda bisa menambahkan handler lain di sini
    };

    if (handlers[callbackData]) {
        handlers[callbackData](callbackQuery);
    } else {
        console.error('Unhandled callback query: ' + callbackData);
    }
}
