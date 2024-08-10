function telegramAPI(method, params) {
    const botToken = stateManager.get('botToken'); // Ambil bot token dari stateManager
    const apiUrl = `https://api.telegram.org/bot${botToken}/${method}`;

    return $.ajax({
        url: apiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function(response) {
            if (!response.ok) {
                displayMessage('Error from Telegram API:', response.description, 'text-danger');

            }
        },
        error: function(xhr, status, error) {
            displayMessage('AJAX Error:', error, 'text-danger');
        }
    });
}
