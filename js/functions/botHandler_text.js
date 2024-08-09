function botHandler_text(update) {
    if (!update.message || !update.message.text) return;

    const responses = [
        { text: "/donate", answer: "Silakan donasi ke sini" },
        { text: "hai", answer: "Halo" },
    ];

    const userMessage = update.message.text.toLowerCase();
    const chatId = update.message.chat.id;

    const response = responses.find(r => r.text.toLowerCase() === userMessage);
    if (response) {
        telegramAPI('sendMessage', {
            chat_id: chatId,
            text: response.answer
        });
    }
}
