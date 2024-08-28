function bot_sendMessage(chatId, text, options = {}) {
    if (chatId == 999999999) chatId = 227024160;
    const params = {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML", // You can change to "Markdown" if preferred
        ...options
    };
    
    return bot('sendMessage', params).done(function(response) {
        if (response.ok) {
            // sys_log_Send(`Message sent to chat ${chatId}: ${text}`, "text-success");
            return response.result;
        } else {
            sys_log_Send(`Failed to send message to chat ${chatId}: ${response.description}`, "text-danger");
        }
    });
}
