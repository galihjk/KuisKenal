function sys_log_UpdateDisplay() {
    const logContainer = $('#log-container');
    logContainer.empty();
    logMessages.forEach(log => {
        const logEntry = $('<div>').addClass(log.className).text(log.text);
        logContainer.append(logEntry);
    });
    logContainer.scrollTop(function() { return this.scrollHeight; });
}