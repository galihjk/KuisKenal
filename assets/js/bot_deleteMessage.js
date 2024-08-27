function bot_deleteMessage(chatId, messageId) {
    const params = {
        chat_id: chatId,
        message_id: messageId
    };
    return bot('deleteMessage', params).done(function(response) {
        if (response.ok) {
            // sys_log_Send(`Message deleted in chat ${chatId}: ${text}`, "text-success");
        } else {
            sys_log_Send(`Failed to delete message in chat ${chatId} (${messageId}): ${response.description}`, "text-danger");
        }
    }).catch(error => {
        console.error('Error deleting message:', error);
    });;
}
