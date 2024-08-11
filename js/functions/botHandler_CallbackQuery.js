function botHandler_CallbackQuery(update) {
    if (update.callback_query) {
        const callbackData = update.callback_query.data;
        const handlers = {
            join: botHandler_CallbackQuery_join,
            extend: botHandler_CallbackQuery_extend
        };

        if (handlers[callbackData]) {
            handlers[callbackData](update.callback_query);
        }
    }
}
