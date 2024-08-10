function displayMessage(text, className='') {
    const messagesList = $('#messages');
    const maxMessages = 200;

    // Tambahkan pesan baru ke dalam list
    const newMessage = $('<li>')
        .addClass(`list-group-item ${className}`)
        .text(text);
    messagesList.append(newMessage);

    // Jika pesan lebih dari maxMessages, hapus pesan yang paling lama
    const messageItems = messagesList.children('li');
    if (messageItems.length > maxMessages) {
        messageItems.first().remove();
    }
}
