function displayMessages(updates) {
    const $messagesList = $('#messages');
    const maxMessages = 200;

    updates.forEach(update => {
        const messageText = update.message ? update.message.text : 'Unknown message';
        const messageHtml = `<li class="list-group-item">${messageText}</li>`;
        $messagesList.append(messageHtml);
    });

    // Check if the number of messages exceeds the maximum allowed
    while ($messagesList.children().length > maxMessages) {
        $messagesList.children().first().remove(); // Remove the oldest message
    }
}
