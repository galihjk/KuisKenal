function botHandler_text_start(chatId, firstName) {
    telegramAPI('sendMessage', {
        chat_id: chatId,
        text: `${firstName} ingin bermain, ayo ikut!`,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Join",
                        callback_data: "underconstruction"
                    }
                ]
            ]
        }
    });
}
