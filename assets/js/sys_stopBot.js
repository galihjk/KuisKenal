function sys_stopBot() {
    if(typeof xhr.abort === 'function') xhr.abort();
    clearInterval(reportInterval);
    isRunning = false;
    $('#start-button').attr('disabled', false);
    $('#stop-button').attr('disabled', true);
    $('#status-label').removeClass('bg-success').addClass('bg-secondary').text('Stopped');
    sys_log_Send("Bot dihentikan.", "text-warning");
}