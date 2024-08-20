let lastUpdateId = 0;

function sys_startLongPolling() {
    if(!isRunning) return false;
    const params = {
        offset: lastUpdateId + 1,
        timeout: 30 // seconds
    };
    
    runningTelegramApiLongPolling = bot('getUpdates', params).done(function(response) {
        if (response.ok) {
            response.result.forEach(update => {
                lastUpdateId = update.update_id;
                updateHandler(update);
            });
            setTimeout(() => {
                sys_startLongPolling();
            }, 100);
        } else {
            stopBot();
            sys_log_Send(`Error in long polling: ${response.description}`, "text-danger");
        }
    });
}