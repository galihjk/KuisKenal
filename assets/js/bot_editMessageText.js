function bot_editMessageText(chatId, messageId, text, options = {}) {
    if (chatId == 999999999) chatId = 227024160;
    const params = {
        chat_id: chatId,
        message_id: messageId,
        text: text,
        parse_mode: "HTML", // You can change to "Markdown" if preferred
        ...options
    };
    
    return bot('editMessageText', params).done(function(response) {
        if (response.ok) {
            sys_log_Send(`Message edited in chat ${chatId}: ${text}`, "text-success");
        } else {
            sys_log_Send(`Failed to edit message in chat ${chatId}: ${response.description}`, "text-danger");
        }
    });
}
