function bot_answerCallbackQuery(callbackQueryId, text, showAlert = false) {
    const params = {
        callback_query_id: callbackQueryId,
        text: text,
        show_alert: showAlert
    };
    
    return bot('answerCallbackQuery', params).done(function(response) {
        if (response.ok) {
            // sys_log_Send(`Callback query answered: ${text}`, "text-success");
        } else {
            sys_log_Send(`Failed to answer callback query: ${response.description}`, "text-danger");
        }
    });
}
