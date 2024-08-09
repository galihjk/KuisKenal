function setupEventHandlers() {
    $('#startServer').click(function() {
        const botToken = $('#botToken').val().trim();
        if (!botToken) {
            alert('Please enter a bot token');
            return;
        }

        $('#status').text('Starting').removeClass('text-secondary text-danger text-success').addClass('text-warning');
        $('#startServer').prop('disabled', true);
        $('#botToken').prop('disabled', true);
        $('#stopServer').prop('disabled', false);

        if (!stateManager.get('polling')) {
            stateManager.set('polling', true);
            startLongPolling(botToken);
        }
    });

    $('#stopServer').click(function() {
        stateManager.set('polling', false);
        $('#status').text('Stopped').removeClass('text-warning text-success').addClass('text-secondary');
        $('#startServer').prop('disabled', false);
        $('#botToken').prop('disabled', false);
        $('#stopServer').prop('disabled', true);
    });
}
