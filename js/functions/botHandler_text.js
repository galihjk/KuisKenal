function botHandler_text(update) {
    if (!update.message || !update.message.text) return;

    const responses = [
        {
            text: "/start",
            action: "botHandler_text_start"
        },
        { text: "/donate", answer: "Silakan donasi ke sini" },
        { text: "hai", answer: "Halo" },
    ];

    const userMessage = update.message.text.toLowerCase();
    const chatId = update.message.chat.id;
    const firstName = update.message.from.first_name || 'User';

    const response = responses.find(r => r.text.toLowerCase() === userMessage);

    if (response) {
        if (response.action) {
            if (typeof window[response.action] === "function") {
                window[response.action](chatId, firstName);
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
