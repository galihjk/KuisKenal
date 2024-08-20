function updateHandler_message(update) {
    const message = update.message;
    const chatId = message.chat.id;

    if (message.text.startsWith("/start")) {
        game_start(update);
    }
}
