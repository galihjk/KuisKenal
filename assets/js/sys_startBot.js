function sys_startBot() {
    botToken = $('#bot-token').val();
    if (!botToken) {
        sys_log_Send("Error: Token bot tidak boleh kosong.", "text-danger");
        return;
    }
    sys_log_Send("Starting...", "text-warning");
    bot_getMe().then(()=>{
        sys_log_Send('Bot started', 'text-success');
        localStorage.setItem('lastBotToken',botToken);
        isRunning = true;
        $('#start-button').attr('disabled', true);
        $('#stop-button').attr('disabled', false);
        $('#status-label').removeClass('bg-secondary').addClass('bg-success').text('Running');
        sys_startLongPolling();
    });
}