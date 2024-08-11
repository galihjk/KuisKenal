function botHandler_text(update) {
    if (!update.message || !update.message.text) return;

    const responses = [
        {
            text: "/start",
            action: "botHandler_text_start"
        },
        {
            text: "/force_stop",
            action: "botHandler_text_forceStop"
        },
        { text: "/donate", answer: "Silakan donasi ke sini" },
        { text: "hai", answer: "Halo" },
    ];

    const userMessage = update.message.text.toLowerCase();
    const chatId = update.message.chat.id;

    const response = responses.find(r => r.text.toLowerCase() === userMessage);

    if (response) {
        if (response.action) {
            if (typeof window[response.action] === "function") {
                window[response.action](update);
            } else {
                displayMessage('Error: action function not defined for ' + response.action, 'text-danger');
            }
        } else if (response.answer) {
            telegramAPI('sendMessage', {
                chat_id: chatId,
                text: response.answer
            });
        }
    } else {
        displayMessage('Unhandled text: ' + userMessage, 'text-warning');
    }
}
