function startLongPolling(botToken) {
    stateManager.set('botToken', botToken); // Simpan bot token ke stateManager
    let offset = 0;

    function poll() {
        if (!stateManager.get('polling')) return;

        $.ajax({
            url: `https://api.telegram.org/bot${botToken}/getUpdates`,
            method: 'GET',
            data: {
                offset: offset,
                timeout: 30 // Timeout 30 detik
            },
            success: function(response) {
                if (response.ok) {
                    $('#status').text('Running').removeClass('text-warning text-danger').addClass('text-success');

                    const updates = response.result;
                    if (updates.length > 0) {
                        offset = updates[updates.length - 1].update_id + 1;

                        updates.forEach(update => {
                            if (update.message) {
                                botHandler_text(update);
                            }
                            if (update.callback_query) {
                                botHandler_CallbackQuery(update);
                            }
                        });
                    }
                } else {
                    handleError(response.description);
                }

                if (stateManager.get('polling')) {
                    poll(); // Lanjutkan polling
                }
            },
            error: function(xhr, status, error) {
                handleError(xhr.responseJSON ? xhr.responseJSON.description : error);
            }
        });
    }

    function handleError(errorMessage) {
        $('#status').text('Error: ' + errorMessage).removeClass('text-warning text-success').addClass('text-danger');
        $('#startServer').prop('disabled', false);
        $('#botToken').prop('disabled', false);
        $('#stopServer').prop('disabled', true);
        stateManager.set('polling', false);

        // Menggunakan displayMessages untuk menampilkan error
        displayMessage('Error: ' + errorMessage, 'text-danger');
    }

    poll();
}
