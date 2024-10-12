function sys_log_Send(text, className = '') {
    logMessages.push({ text: '['+ new Date().toLocaleString() + '] '+text, className: className });
    if (logMessages.length > MAX_LOG_LINES) {
        logMessages.shift();
    }
    sys_log_UpdateDisplay();
}