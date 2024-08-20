function sys_log_Send(text, className = '') {
    logMessages.push({ text, className });
    if (logMessages.length > MAX_LOG_LINES) {
        logMessages.shift();
    }
    sys_log_UpdateDisplay();
}